import { Component, Input } from '@angular/core';

import { User } from '../../../modules/core/domain/entities/user.model';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
	@Input()
	public user!: User;

	public constructor() {
		//
	}
}
