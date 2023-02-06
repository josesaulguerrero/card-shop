import { Component, Input } from '@angular/core';

import { CardGroup } from '../../../modules/core/services/db/db-cards.service';

@Component({
	selector: 'app-deck-card',
	templateUrl: './deck-card.component.html',
	styleUrls: ['./deck-card.component.scss'],
})
export class DeckCardComponent {
	@Input()
	public card!: CardGroup;
}
