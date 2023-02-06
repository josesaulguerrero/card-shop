import { Component, Input } from '@angular/core';

import { CardGroup } from '../../../modules/core/services/db/db-cards.service';
import { Card } from '../../../modules/core/domain/entities/card.model';
import { CurrentUserService } from 'src/app/modules/core/services/business/current-user.service';

@Component({
	selector: 'app-purchasable-card',
	templateUrl: './purchasable-card.component.html',
	styleUrls: ['./purchasable-card.component.scss'],
})
export class PurchasableCardComponent {
	@Input()
	public card!: CardGroup;

	public constructor(private readonly _currentUser: CurrentUserService) {}

	public get pokemon(): Card {
		return this.card.cards[0];
	}
	public get available(): number {
		return this.card.cards.length;
	}
	public get price(): number {
		return this.card.cards[0].price;
	}

	public onBuyCard(): void {
		this._currentUser.buyCard(this.card.cards.pop() as Card).subscribe();
	}
}
