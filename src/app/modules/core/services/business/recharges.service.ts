import { Injectable } from '@angular/core';

import { Recharge } from '../../domain/entities/recharge.model';
import { User } from '../../domain/entities/user.model';
import { ISODate } from '../../domain/valueObject/date.model';

@Injectable({
	providedIn: 'root',
})
export class RechargesService {
	public userHasEnoughCreditForRecharge(
		user: User,
		recharge: Recharge,
	): boolean {
		const rechargeDate = new ISODate(recharge.performedAt);
		const balanceRechargedToday: number = user.recharges
			.map((r) => ({ ...r, performedAt: new ISODate(r.performedAt) }))
			.filter((r) => ISODate.compareDates(r.performedAt, rechargeDate))
			.map((r) => r.amount)
			.reduce((accumulator, amount) => {
				return accumulator + amount;
			}, 0);

		return balanceRechargedToday + recharge.amount <= 200;
	}
}
