import * as _ from 'lodash-es';
import { from, Observable, of, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	Auth,
	AuthProvider,
	signInWithPopup,
	signOut,
	User as GoogleUser,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { User } from '../../core/domain/entities/user.model';
import { DbUsersService } from '../../core/services/db/db-users.service';

@Injectable()
export class AuthenticationService {
	public constructor(
		private readonly _fireAuth: Auth,
		private readonly _router: Router,
		private readonly _dbUsersService: DbUsersService,
	) {}

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

	public signInWithPopup(authProvider: AuthProvider): Observable<User> {
		return from(signInWithPopup(this._fireAuth, authProvider)).pipe(
			switchMap((credentials) =>
				this.registerUserIfNotRegisteredYet(credentials.user),
			),
		);
	}

	private registerUserIfNotRegisteredYet(
		credentials: GoogleUser,
	): Observable<User> {
		return this._dbUsersService.getById(credentials.uid).pipe(
			switchMap((user) => {
				if (user) return of(user);

				const newUser = this.mapFirebaseUserCredentials(credentials);

				return this._dbUsersService.register(newUser);
			}),
		);
	}

	public signOut(): Observable<void> {
		return from(signOut(this._fireAuth)).pipe(
			tap(() => {
				this._router.navigateByUrl('/');
			}),
		);
	}
}
