import { from, Observable, of, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	Auth,
	AuthProvider,
	signInWithPopup,
	signOut,
	User as GoogleUser,
} from '@angular/fire/auth';

import { User } from '../../core/domain/entities/user.model';
import { CurrentUserService } from '../../core/services/business/current-user.service';
import { DbUsersService } from '../../core/services/db/db-users.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
	public constructor(
		private readonly _fireAuth: Auth,
		private readonly _router: Router,
		private readonly _dbUsersService: DbUsersService,
		private readonly _currentUserService: CurrentUserService,
	) {}

	public signInWithPopup(authProvider: AuthProvider): Observable<User> {
		return from(signInWithPopup(this._fireAuth, authProvider)).pipe(
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

	public signOut(): Observable<void> {
		return from(signOut(this._fireAuth)).pipe(
			tap(() => {
				this._router.navigateByUrl('/');
			}),
		);
	}
}
