import { Component, Input } from '@angular/core';
import {
	FormControl,
	NonNullableFormBuilder,
	Validators,
} from '@angular/forms';

import { AtomicInput } from '../models/atomic-input.model';

@Component({
	selector: 'app-number-input',
	templateUrl: './number-input.component.html',
	styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent implements AtomicInput<number> {
	@Input()
	public control: FormControl<number>;

	@Input()
	public placeholder: string;

	@Input()
	public required: boolean;

	@Input()
	public name?: string | undefined;

	constructor(private readonly _formBuilder: NonNullableFormBuilder) {
		this.placeholder = '';
		this.required ??= false;

		const validators = [];
		this.required && validators.push(Validators.required);
		this.control ??= _formBuilder.control(0, validators);
	}
}
