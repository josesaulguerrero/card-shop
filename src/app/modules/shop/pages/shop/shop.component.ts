import { Observable } from 'rxjs';

import { Component } from '@angular/core';

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

	public constructor(private readonly _dbCardsService: DbCardsService) {
		_dbCardsService.get().subscribe((groups) => {
			this.cardGroups = groups.sort((a, b) => (a.name < b.name ? -1 : 1));
		});
	}
}
