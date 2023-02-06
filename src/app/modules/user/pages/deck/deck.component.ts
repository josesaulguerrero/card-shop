import { Component, OnInit } from '@angular/core';

import { CurrentUserService } from '../../../../modules/core/services/business/current-user.service';
import {
	CardGroup,
	DbCardsService,
} from 'src/app/modules/core/services/db/db-cards.service';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
	public cards: CardGroup[];

	public constructor(private readonly _currentUser: CurrentUserService) {
		this.cards = [];
	}

	public ngOnInit(): void {
		this._currentUser.currentUser.subscribe({
			next: (user) => {
				if (!user) return;
				this.cards = DbCardsService.groupCards(user.deck);
			},
		});
	}
}
