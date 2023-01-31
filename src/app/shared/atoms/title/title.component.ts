import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
	@Input()
	public text: string;

	@Input()
	public size: 'small' | 'medium' | 'large';

	public constructor() {
		this.text ??= '';
		this.size ??= 'large';
	}
}
