import { Component } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../../modules/core/services/auth/authentication.service';
import { AuthPlatform } from '../../../../shared/atoms/auth-button/auth-button.component';

type LoginPlatform = AuthPlatform & {
	onLogin: () => void;
};

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
		];
	}

	public signInWithGoogle(): void {
		this._authService
			.signInWithPopup(new GoogleAuthProvider())
			.subscribe(() => {
				this._router.navigateByUrl('app/store');
			});
	}

	public onLogin(platformName: string): void {
		this.authPlatforms
			.find((platform) => platform.name === platformName)
			?.onLogin();
	}
}
