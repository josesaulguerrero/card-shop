import { from, map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	collection,
	collectionData,
	CollectionReference,
	doc,
	Firestore,
	query,
	setDoc,
	UpdateData,
	updateDoc,
	where,
} from '@angular/fire/firestore';

import { User } from '../../domain/entities/user.model';

@Injectable({
	providedIn: 'root',
})
export class DbUsersService {
	private readonly USERS_COLLECTION_NAME = 'users';

	private readonly usersCollectionRef: CollectionReference<User>;

	public constructor(private readonly _db: Firestore) {
		this.usersCollectionRef = collection(
			this._db,
			this.USERS_COLLECTION_NAME,
		) as CollectionReference<User>;
	}

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

	public register(user: User): Observable<User> {
		const docRef = doc(this.usersCollectionRef, user.uid);

		return from(setDoc(docRef, user)).pipe(
			switchMap(() => this.getById(docRef.id) as Observable<User>),
		);
	}

	public update(uid: string, changes: UpdateData<User>): Observable<void> {
		const docRef = doc(this.usersCollectionRef, uid);

		return from(updateDoc<User>(docRef, changes));
	}
}
