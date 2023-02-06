import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../../modules/core/domain/entities/user.model';
import { CurrentUserService } from '../../../../modules/core/services/business/current-user.service';

@Component({
	selector: 'app-recharge',
	templateUrl: './recharge.component.html',
	styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {
	public user!: User | null;

	public rechargeForm: FormGroup;

	public errors: string[] = [];

	public constructor(private readonly _currentUser: CurrentUserService) {
		this.rechargeForm = new FormGroup({
			amount: new FormControl(0, {
				validators: [Validators.min(1), Validators.max(200)],
				nonNullable: true,
			}),
		});
	}

	public ngOnInit(): void {
		this._currentUser.currentUser.subscribe({
			next: (user) => {
				this.user = user;
			},
		});
	}

	public onCommitRecharge(): void {
		if (this.rechargeForm.invalid) return;

		this._currentUser
			.rechargeBalance(this.rechargeForm.value['amount'])
			.subscribe({
				next: () => {
					this.rechargeForm.reset();
				},
				error: (error: Error) => {
					this.errors = [];
					this.errors.push(error.message);
				},
			});
	}
}
