import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-text',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss'],
})
export class TextComponent {
	@Input()
	public text: string;

	public constructor() {
		this.text ??= 'Lorem Ipsum';
	}
}
