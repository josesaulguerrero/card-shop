import { from, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthProvider, signInWithPopup, signOut } from '@firebase/auth';

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
			switchMap((credentials) =>
				this._dbUsersService.getById(credentials.user.uid).pipe(
					switchMap((user) => {
						if (user) return of(user);

						const newUser =
							this._currentUserService.mapFirebaseUserCredentials(
								credentials.user,
							);

						return this._dbUsersService.register(newUser);
					}),
				),
			),
		);
	}

	public signOut(): Observable<void> {
		return from(signOut(this._fireAuth));
	}
}
