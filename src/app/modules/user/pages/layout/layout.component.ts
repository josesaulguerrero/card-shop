import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../modules/auth/services/authentication.service';
import { User } from '../../../../modules/core/domain/entities/user.model';
import { CurrentUserService } from '../../../../modules/core/services/business/current-user.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
	public user!: User | null;

	public constructor(
		private readonly _currentUser: CurrentUserService,
		private readonly _authService: AuthenticationService,
	) {}

	public ngOnInit(): void {
		this._currentUser.currentUser.subscribe({
			next: (user) => {
				this.user = user;
			},
		});
	}

	public onLogout(): void {
		this._authService.signOut().subscribe({});
	}
}
