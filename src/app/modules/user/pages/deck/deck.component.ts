import { Component, OnInit } from '@angular/core';

import { User } from '../../../../modules/core/domain/entities/user.model';
import { CurrentUserService } from '../../../../modules/core/services/business/current-user.service';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
	public user!: User | null;

	public constructor(private readonly _currentUser: CurrentUserService) {}

	public ngOnInit(): void {
		this._currentUser.currentUser.subscribe({
			next: (user) => {
				this.user = user;
			},
		});
	}
}
