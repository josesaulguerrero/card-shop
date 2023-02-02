import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../../modules/core/domain/entities/user.model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Input()
	public user!: User | null;

	@Output()
	public logout: EventEmitter<boolean>;

	public constructor() {
		this.logout = new EventEmitter();
	}

	public onLogout(): void {
		this.logout.emit(true);
	}
}
