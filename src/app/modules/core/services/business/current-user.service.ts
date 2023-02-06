import { BehaviorSubject, Observable, switchMap, take, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';

import { Card } from '../../domain/entities/card.model';
import { Recharge } from '../../domain/entities/recharge.model';
import { User } from '../../domain/entities/user.model';
import { HistoryType } from '../../domain/enums/historyType.model';
import { ISODate } from '../../domain/valueObject/date.model';
import { DbUsersService } from '../db/db-users.service';
import { CardsService } from './cards.service';
import { RechargesService } from './recharges.service';

@Injectable({
	providedIn: 'root',
})
export class CurrentUserService {
	private readonly _currentUser$: BehaviorSubject<User | null>;

	public constructor(
		private readonly _dbUsersService: DbUsersService,
		private readonly _rechargesService: RechargesService,
		private readonly _cardsService: CardsService,
		private readonly _fireAuth: Auth,
	) {
		this._currentUser$ = new BehaviorSubject<User | null>(null);

		this._fireAuth.onIdTokenChanged((user) => {
			this.refreshUserRef(user?.uid);
		});
	}

	public get currentUser(): Observable<User> {
		return this._currentUser$ as Observable<User>;
	}

	private refreshUserRef(firebaseUserUid: string | null | undefined): void {
		if (!firebaseUserUid) return;

		this._dbUsersService.getById(firebaseUserUid).subscribe({
			next: (user) => {
				this._currentUser$.next(user);
			},
		});
	}

	public addCardToDeck(card: Card): Observable<void> {
		return this.currentUser.pipe(
			switchMap((user) =>
				this._dbUsersService.update(user.uid, {
					deck: arrayUnion(card),
				}),
			),
		);
	}

	public removeCardFromDeck(card: Card): Observable<void> {
		return this.currentUser.pipe(
			switchMap((user) =>
				this._dbUsersService.update(user.uid, {
					deck: arrayRemove(card),
				}),
			),
		);
	}

	public rechargeBalance(amount: number): Observable<void> {
		const recharge: Recharge = {
			uid: uuid(),
			performedAt: ISODate.now().ISOString,
			amount,
		};

		return this.currentUser.pipe(
			take(1),
			tap((user) => {
				const validRecharge =
					this._rechargesService.userHasEnoughCreditForRecharge(
						user,
						recharge,
					);

				if (!validRecharge)
					throw new Error(
						"You don't have enough credits to perform a balance recharge.",
					);
			}),
			switchMap((user) =>
				this._dbUsersService.update(user.uid, {
					balance: user.balance + recharge.amount,
					recharges: arrayUnion(recharge),
				}),
			),
		);
	}

	public subtractFromBalance(amount: number): Observable<void> {
		return this.currentUser.pipe(
			tap(({ balance }) => {
				if (balance < amount)
					throw new Error(
						'Your balance is not enough to subtract this amount.',
					);
			}),
			switchMap(({ balance, uid }) => {
				return this._dbUsersService.update(uid, {
					balance: balance - amount,
				});
			}),
		);
	}

	public buyCard(card: Card): Observable<void> {
		return this.currentUser.pipe(
			switchMap((user) => {
				this.performBuyValidations(user.balance, card);

				return this._cardsService.setInactiveForSale(card.uid).pipe(
					switchMap(() =>
						this._cardsService.addHistoryChange(card.uid, {
							uid: uuid(),
							owner: user,
							type: HistoryType.GIFT,
						}),
					),
					switchMap(() => this.addCardToDeck(card)),
					switchMap(() => this.subtractFromBalance(card.price)),
				);
			}),
		);
	}

	private performBuyValidations(userBalance: number, card: Card): void {
		if (!card.activeForSale)
			throw new Error('This card is not available for sale.');
		if (userBalance < card.price)
			throw new Error('Your balance is not enough to buy this card.');
	}

	public giftCardTo(card: Card, recipientUid: string): Observable<void> {
		return this.currentUser.pipe(
			switchMap((user) => {
				return this._cardsService.addHistoryChange(card.uid, {
					uid: uuid(),
					owner: user,
					type: HistoryType.GIFT,
				});
			}),
			switchMap(() => {
				return this._dbUsersService.update(recipientUid, {
					deck: arrayUnion(card),
				});
			}),
		);
	}
}
