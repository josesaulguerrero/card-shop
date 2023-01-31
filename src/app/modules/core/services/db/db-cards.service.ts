import { collection, DocumentReference } from 'firebase/firestore';
import { groupBy, map as mapper, toArray } from 'lodash-es';
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
				const groups = groupBy(cards, (card) => card.name);
				const mappedGroups = mapper(
					groups,
					(value, key): CardGroup => ({
						name: key,
						cards: value,
					}),
				);
				return toArray<CardGroup>(mappedGroups);
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
