import { from, Observable, of, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	Auth,
	AuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	User as GoogleUser,
} from '@angular/fire/auth';

import { User } from '../../core/domain/entities/user.model';
import { CurrentUserService } from '../../core/services/business/current-user.service';
import { DbUsersService } from '../../core/services/db/db-users.service';

@Injectable()
export class AuthenticationService {
	public constructor(
		private readonly _fireAuth: Auth,
		private readonly _dbUsersService: DbUsersService,
		private readonly _currentUserService: CurrentUserService,
	) {}

	public signInWithPopup(authProvider: AuthProvider): Observable<User> {
		return from(signInWithPopup(this._fireAuth, authProvider)).pipe(
			tap(console.log),
			switchMap((credentials) =>
				this.registerUserIfNotRegisteredYet(credentials.user),
			),
		);
	}

	private registerUserIfNotRegisteredYet(user: GoogleUser): Observable<User> {
		return this._dbUsersService.getById(user.uid).pipe(
			switchMap((user) => {
				if (user) return of(user);

				const newUser =
					this._currentUserService.mapFirebaseUserCredentials(user);

				return this._dbUsersService.register(newUser);
			}),
		);
	}

	private getAuthProviderForId(providerId: string) {
		switch (providerId) {
			case GoogleAuthProvider.PROVIDER_ID:
				return GoogleAuthProvider;
			case GithubAuthProvider.PROVIDER_ID:
				return GithubAuthProvider;
			default:
				throw new Error(`No provider implemented for ${providerId}`);
		}
	}

	public signOut(): Observable<void> {
		return from(signOut(this._fireAuth));
	}
}
