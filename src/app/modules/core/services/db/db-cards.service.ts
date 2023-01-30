import { collection, DocumentReference } from 'firebase/firestore';
import * as _ from 'lodash';
import { from, map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	collectionData,
	CollectionReference,
	doc,
	Firestore,
	query,
	UpdateData,
	updateDoc,
	where,
} from '@angular/fire/firestore';

import { Card } from '../../domain/entities/card.model';

export type CardGroup = {
	name: string;
	cards: Card[];
};

@Injectable({
	providedIn: 'root',
})
export class DbCardsService {
	private readonly CARDS_COLLECTION = 'cards';

	private readonly cardsCollectionRef: CollectionReference;

	public constructor(private readonly _db: Firestore) {
		this.cardsCollectionRef = collection(this._db, this.CARDS_COLLECTION);
	}

	public get(): Observable<CardGroup[]> {
		const getQuery = query(this.cardsCollectionRef);
		return (collectionData(getQuery) as Observable<Card[]>).pipe(
			map((cards: Card[]) => {
				return _.chain(cards)
					.groupBy((card) => card.name)
					.map(
						(value, key): CardGroup => ({
							name: key,
							cards: value,
						}),
					)
					.value();
			}),
		);
	}

	public getByName(name: string): Observable<CardGroup> {
		const getByNameQuery = query(
			this.cardsCollectionRef,
			where('name', '==', name),
		);

		return (collectionData(getByNameQuery) as Observable<Card[]>).pipe(
			map(
				(cards): CardGroup => ({
					name,
					cards,
				}),
			),
		);
	}

	public update(uid: string, changes: UpdateData<Card>): Observable<void> {
		const docRef = doc(
			this.cardsCollectionRef,
			uid,
		) as DocumentReference<Card>;

		return from(updateDoc<Card>(docRef, changes));
	}
}
