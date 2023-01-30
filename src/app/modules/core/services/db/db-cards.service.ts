import { collection, DocumentReference } from 'firebase/firestore';
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

@Injectable({
	providedIn: 'root',
})
export class DbCardsService {
	private readonly CARDS_COLLECTION = 'cards';

	private readonly cardsCollectionRef: CollectionReference;

	public constructor(private readonly _db: Firestore) {
		this.cardsCollectionRef = collection(this._db, this.CARDS_COLLECTION);
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

	public update(uid: string, changes: UpdateData<Card>): Observable<void> {
		const docRef = doc(
			this.cardsCollectionRef,
			uid,
		) as DocumentReference<Card>;

		return from(updateDoc<Card>(docRef, changes));
	}
}
