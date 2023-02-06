import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardGroup } from '../../../modules/core/services/db/db-cards.service';
import { Card } from '../../../modules/core/domain/entities/card.model';

@Component({
	selector: 'app-purchasable-card',
	templateUrl: './purchasable-card.component.html',
	styleUrls: ['./purchasable-card.component.scss'],
})
export class PurchasableCardComponent {
	@Input()
	public card!: CardGroup;

	@Output()
	public cardPurchased: EventEmitter<Card>;

	public constructor() {
		this.cardPurchased = new EventEmitter();
	}

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
		this.cardPurchased.emit(this.card.cards[0]);
	}
}
