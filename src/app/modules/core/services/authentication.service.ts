import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from '../domain/entities/user.model';
import { AuthProvider, UserCredential, signInWithPopup } from '@firebase/auth';
import { from } from 'rxjs';
import { map } from 'lodash';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	public constructor(
		private readonly _fireAuth: Auth, // private readonly _userService: any,
	) {}

	// public signInWithPopup(authProvider: AuthProvider): User {
	// 	from(signInWithPopup(this._fireAuth, authProvider)).pipe(
	// 		map(({ user: credentials }: UserCredential): User => {
	// 			return {
	// 				avatar:
	// 					credentials.photoURL ??
	// 					'https://i.postimg.cc/fLZq6rfx/image.png',
	//           balance:
	// 			};
	// 		}),
	// 	);
	// }
}
