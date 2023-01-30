import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthPlatform } from '../../atoms/auth-button/auth-button.component';

@Component({
	selector: 'app-sign-in-form',
	templateUrl: './sign-in-form.component.html',
	styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
	@Input()
	public authPlatforms!: AuthPlatform[];

	@Output()
	public login: EventEmitter<string>;

	public constructor() {
		this.login = new EventEmitter();
	}
}
