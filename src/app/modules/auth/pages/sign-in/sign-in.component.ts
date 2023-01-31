import { Component } from '@angular/core';
import { GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
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

	public constructor(
		private readonly _authService: AuthenticationService,
		private readonly _router: Router,
	) {
		this.authPlatforms = [
			{
				iconSrc: 'https://i.postimg.cc/vHSLb94W/image.png',
				name: 'Google',
				onLogin: () => this.signInWithGoogle(),
			},
			{
				iconSrc: 'https://i.postimg.cc/YqZfcRJD/image.png',
				name: 'Github',
				onLogin: () => this.signInWithGithub(),
			},
		];
	}

	public signInWithGoogle(): void {
		this._authService
			.signInWithPopup(new GoogleAuthProvider())
			.subscribe(() => this.redirectToApp());
	}

	public signInWithGithub(): void {
		this._authService
			.signInWithPopup(new GithubAuthProvider())
			.subscribe(() => this.redirectToApp());
	}

	private redirectToApp(): void {
		this._router.navigateByUrl('app/store');
	}
}
