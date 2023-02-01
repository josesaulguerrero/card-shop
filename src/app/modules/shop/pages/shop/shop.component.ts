import { Component } from '@angular/core';

import { AuthenticationService } from '../../../../modules/auth/services/authentication.service';
import { User } from '../../../../modules/core/domain/entities/user.model';
import { CurrentUserService } from '../../../../modules/core/services/business/current-user.service';
import {
	CardGroup,
	DbCardsService,
} from '../../../../modules/core/services/db/db-cards.service';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
	public cardGroups: CardGroup[] = [];
	public currentUser: User;

	public constructor(
		private readonly _dbCardsService: DbCardsService,
		private readonly _currentUser: CurrentUserService,
		private readonly _authService: AuthenticationService,
	) {
		_dbCardsService.get().subscribe((groups) => {
			this.cardGroups = groups.sort((a, b) => (a.name < b.name ? -1 : 1));
		});
		this.currentUser = this._currentUser.currentUser;
	}

	public onLogout(): void {
		this._authService.signOut().subscribe({});
	}
}
