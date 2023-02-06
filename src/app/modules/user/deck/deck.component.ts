import { Component, OnInit } from '@angular/core';

import { User } from '../../core/domain/entities/user.model';
import { CurrentUserService } from '../../core/services/business/current-user.service';
import { CardGroup } from 'src/app/modules/core/services/db/db-cards.service';
import { CardsService } from 'src/app/modules/core/services/business/cards.service';

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
				this.cards = CardsService;
			},
		});
	}
}
