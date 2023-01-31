import { Component } from '@angular/core';

import { DbCardsService } from '../../../../modules/core/services/db/db-cards.service';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
	public constructor(private readonly _dbCardsService: DbCardsService) {}
}
