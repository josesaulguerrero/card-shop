import { FormControl } from '@angular/forms';

export interface AtomicInput<T> {
	control: FormControl<T>;
	placeholder: string;
	required: boolean;
	name?: string;
}
