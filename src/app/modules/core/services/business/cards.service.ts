import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { arrayUnion } from '@angular/fire/firestore';

import { HistoryChange } from '../../domain/entities/historyChange.model';
import { DbCardsService } from '../db/db-cards.service';

@Injectable({
	providedIn: 'root',
})
export class CardsService {
	public constructor(private _dbCardsService: DbCardsService) {}

	public addHistoryChange(
		uid: string,
		change: HistoryChange,
	): Observable<void> {
		return this._dbCardsService.update(uid, {
			history: arrayUnion(change),
		});
	}

	public setInactiveForSale(uid: string): Observable<void> {
		return this._dbCardsService.update(uid, {
			activeForSale: false,
		});
	}
}
