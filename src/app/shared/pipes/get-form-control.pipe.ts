import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
	name: 'formControl',
})
export class FormControlPipe implements PipeTransform {
	public transform(
		control: AbstractControl,
	): FormControl<(typeof control)['value']> {
		return control as FormControl<(typeof control)['value']>;
	}
}
