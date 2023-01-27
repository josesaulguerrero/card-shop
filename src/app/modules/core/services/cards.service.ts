import { collection, DocumentReference } from 'firebase/firestore';
import { from, map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	arrayUnion,
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
import { HistoryChange } from '../domain/entities/historyChange.model';

@Injectable({
	providedIn: 'root',
})
export class CardsService {
	private static readonly CARDS_COLLECTION = 'cards';

	private readonly cardsCollectionRef: CollectionReference;

	public constructor(private readonly _db: Firestore) {
		this.cardsCollectionRef = collection(
			this._db,
			CardsService.CARDS_COLLECTION,
		);
	}

	public get(): Observable<Card[]> {
		const getQuery = query(this.cardsCollectionRef);
		return collectionData(getQuery) as Observable<Card[]>;
	}

	public getById(uid: string): Observable<Card> {
		const getByIdQuery = query(
			this.cardsCollectionRef,
			where('uid', '==', uid),
		);

		return collectionData(getByIdQuery).pipe(
			map((results) => results.at(0) ?? {}),
		) as Observable<Card>;
	}

	public addHistoryChange(
		uid: string,
		change: HistoryChange,
	): Observable<void> {
		return this.update(uid, {
			history: arrayUnion(change),
		});
	}

	public setInactiveForSale(uid: string): Observable<void> {
		return this.update(uid, {
			activeForSale: false,
		});
	}

	private update(uid: string, changes: UpdateData<Card>): Observable<void> {
		const docRef = doc(
			this.cardsCollectionRef,
			uid,
		) as DocumentReference<Card>;

		return from(updateDoc<Card>(docRef, changes));
	}
}
