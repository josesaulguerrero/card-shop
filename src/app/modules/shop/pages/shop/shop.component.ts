import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../modules/auth/services/authentication.service';
import { Card } from '../../../../modules/core/domain/entities/card.model';
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
export class ShopComponent implements OnInit {
	public cardGroups: CardGroup[] = [];
	public currentUser!: User | null;

	public constructor(
		private readonly _dbCardsService: DbCardsService,
		private readonly _currentUser: CurrentUserService,
		private readonly _authService: AuthenticationService,
	) {}

	public ngOnInit(): void {
		this._dbCardsService.get().subscribe((groups) => {
			this.cardGroups = groups.sort((a, b) => (a.name < b.name ? -1 : 1));
		});

		this._currentUser.currentUser.subscribe({
			next: (user) => {
				this.currentUser = user;
			},
		});
	}

	public onCardPurchased(card: Card): void {
		this._currentUser.buyCard(card).subscribe();
	}

	public onLogout(): void {
		this._authService.signOut().subscribe({});
	}
}
