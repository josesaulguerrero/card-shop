import { Component, Input } from '@angular/core';

import { AuthPlatform } from '../../../modules/auth/models/auth.model';

@Component({
	selector: 'app-auth-button',
	templateUrl: './auth-button.component.html',
	styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent {
	@Input()
	public authPlatform!: AuthPlatform;
}
