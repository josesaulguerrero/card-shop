import { Component, Input } from '@angular/core';

export type AuthPlatform = {
	name: string;
	iconSrc: string;
};

@Component({
	selector: 'app-auth-button',
	templateUrl: './auth-button.component.html',
	styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent {
	@Input()
	public authPlatform!: AuthPlatform;
}
