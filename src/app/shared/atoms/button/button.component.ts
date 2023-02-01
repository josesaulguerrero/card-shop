import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input()
	public text: string;

	@Output()
	public buttonClick: EventEmitter<MouseEvent>;

	public constructor() {
		this.text = 'Click Me';
		this.buttonClick = new EventEmitter();
	}

	public onNativeClick(event: MouseEvent): void {
		this.buttonClick.emit(event);
	}
}
