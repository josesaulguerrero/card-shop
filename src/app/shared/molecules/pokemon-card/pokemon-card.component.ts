import { Component, Input } from '@angular/core';

import { CardGroup } from '../../../modules/core/services/db/db-cards.service';
import { Card } from '../../../modules/core/domain/entities/card.model';

@Component({
	selector: 'app-pokemon-card',
	templateUrl: './pokemon-card.component.html',
	styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
	@Input()
	public card!: CardGroup;

	public get pokemon(): Card {
		return this.card.cards[0];
	}
	public get available(): number {
		return this.card.cards.length;
	}
	public get price(): number {
		return this.card.cards[0].price;
	}
}
