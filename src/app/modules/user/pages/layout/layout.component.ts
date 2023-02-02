import { Component } from '@angular/core';

import { AuthenticationService } from '../../../../modules/auth/services/authentication.service';
import { User } from '../../../../modules/core/domain/entities/user.model';
import { CurrentUserService } from '../../../../modules/core/services/business/current-user.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
	public user: User;

	public constructor(
		private readonly _currentUser: CurrentUserService,
		private readonly _authService: AuthenticationService,
	) {
		this.user = this._currentUser.currentUser;
	}

	public onLogout(): void {
		this._authService.signOut().subscribe({});
	}
}
