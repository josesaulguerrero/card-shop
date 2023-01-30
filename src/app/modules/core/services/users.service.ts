import * as _ from 'lodash';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Injectable } from '@angular/core';
import { Auth, User as GoogleUser } from '@angular/fire/auth';
import {
	arrayRemove,
	arrayUnion,
	collection,
	collectionData,
	CollectionReference,
	doc,
	Firestore,
	query,
	UpdateData,
	updateDoc,
	where,
} from '@angular/fire/firestore';

import { Card } from '../domain/entities/card.model';
import { Recharge } from '../domain/entities/recharge.model';
import { User } from '../domain/entities/user.model';
import { ISODate } from '../domain/valueObject/date.model';
import { CardsService } from './cards.service';
import { RechargesService } from './recharges.service';
import { HistoryType } from '../domain/enums/historyType.model';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	private _currentUser: User | null = null;

	private readonly USERS_COLLECTION_NAME = 'users';

	private readonly usersCollectionRef: CollectionReference<User>;

	public constructor(
		private readonly _rechargesService: RechargesService,
		private readonly _cardsService: CardsService,
		private readonly _fireAuth: Auth,
		private readonly _db: Firestore,
	) {
		this.usersCollectionRef = collection(
			this._db,
			this.USERS_COLLECTION_NAME,
		) as CollectionReference<User>;
	}

	public get currentUser(): User {
		return (
			this._currentUser ??
			this.mapFirebaseUserCredentials(this._fireAuth.currentUser)
		);
	}

	public set currentUser(user: User) {
		if (this._currentUser)
			throw new Error(
				'You cannot reset the current user since it already exists.',
			);

		this._currentUser = user;
	}

	public mapFirebaseUserCredentials = (
		credentials: GoogleUser | null,
		defaults?: Partial<User>,
	): User => {
		if (_.isEmpty(credentials))
			throw new Error('The user credentials cannot be empty.');

		return {
			uid: credentials.uid,
			avatar: credentials.photoURL ?? defaults?.avatar ?? '',
			balance: defaults?.balance ?? 0,
			deck: defaults?.deck ?? [],
			email: credentials.email ?? defaults?.email ?? '',
			recharges: defaults?.recharges ?? [],
			username: credentials.displayName ?? defaults?.username ?? '',
		};
	};

	public get(): Observable<User[]> {
		const getQuery = query(this.usersCollectionRef);
		return collectionData(getQuery);
	}

	public getById(uid: string): Observable<User | null> {
		const getByIdQuery = query(
			this.usersCollectionRef,
			where('uid', '==', uid),
		);

		return collectionData<User>(getByIdQuery).pipe(
			map((results): User | null => results.at(0) ?? null),
		);
	}

	public addCardToDeck(card: Card): Observable<void> {
		return this.update(this.currentUser.uid, {
			deck: arrayUnion(card),
		});
	}

	public removeCardFromDeck(card: Card): Observable<void> {
		return this.update(this.currentUser.uid, {
			deck: arrayRemove(card),
		});
	}

	private rechargeBalance(amount: number): Observable<void> {
		const recharge: Recharge = {
			uid: uuid(),
			performedAt: ISODate.now(),
			amount,
		};
		const validRecharge =
			this._rechargesService.userHasEnoughCreditForRecharge(
				this.currentUser,
				recharge,
			);

		return of(validRecharge).pipe(
			switchMap((isValid) => {
				if (!isValid) return of();

				return this.update(this.currentUser.uid, {
					balance: this.currentUser.balance + recharge.amount,
					recharges: arrayUnion(recharge),
				});
			}),
		);
	}

	public subtractFromBalance(amount: number): Observable<void> {
		return of(amount).pipe(
			switchMap((amount) => {
				if (this.currentUser.balance < amount)
					throw new Error(
						'Your balance is not enough to subtract this amount.',
					);

				return this.update(this.currentUser.uid, {
					balance: this.currentUser.balance - amount,
				});
			}),
		);
	}

	public buyCard(card: Card): Observable<void> {
		return of(card).pipe(
			map((card) => {
				if (!card.activeForSale)
					throw new Error('This card is not available for sale.');
				if (this.currentUser.balance < card.price)
					throw new Error(
						'Your balance is not enough to buy this card.',
					);
				return card;
			}),
			switchMap((card) => {
				return this._cardsService.setInactiveForSale(card.uid).pipe(
					switchMap(() =>
						this._cardsService.addHistoryChange(card.uid, {
							uid: uuid(),
							owner: this.currentUser,
							type: HistoryType.GIFT,
						}),
					),
					switchMap(() => this.addCardToDeck(card)),
					switchMap(() => this.subtractFromBalance(card.price)),
				);
			}),
		);
	}

	public giftCardTo(card: Card, recipientUid: string): Observable<void> {
		return this.removeCardFromDeck(card).pipe(
			switchMap(() => {
				return this._cardsService.addHistoryChange(card.uid, {
					uid: uuid(),
					owner: this.currentUser,
					type: HistoryType.GIFT,
				});
			}),
			switchMap(() => {
				return this.update(recipientUid, {
					deck: arrayUnion(card),
				});
			}),
		);
	}

	private update(uid: string, changes: UpdateData<User>): Observable<void> {
		const docRef = doc(this.usersCollectionRef, uid);

		return from(updateDoc<User>(docRef, changes));
	}
}
