import { Component } from '@angular/core';
import {
	AuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { LoginPlatform } from '../../models/auth.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
	public authPlatforms: LoginPlatform[];

	public errors: string[] = [];

	public constructor(
		private readonly _authService: AuthenticationService,
		private readonly _router: Router,
	) {
		this.authPlatforms = [
			{
				iconSrc: 'https://i.postimg.cc/vHSLb94W/image.png',
				name: 'Google',
				onLogin: () => this.signIn(new GoogleAuthProvider()),
			},
			{
				iconSrc: 'https://i.postimg.cc/YqZfcRJD/image.png',
				name: 'Github',
				onLogin: () => this.signIn(new GithubAuthProvider()),
			},
		];
	}

	public signIn(provider: AuthProvider): void {
		this.errors = [];

		this._authService.signInWithPopup(provider).subscribe({
			next: () => this.redirectToApp(),
			error: (error) => {
				if (
					error?.code ===
					'auth/account-exists-with-different-credential'
				) {
					this.errors.push(
						'It seems your email is already linked to another account.',
					);
				}
			},
		});
	}

	private redirectToApp(): void {
		this._router.navigateByUrl('shop');
	}
}
