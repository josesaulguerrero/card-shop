import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input()
	public text: string;

	@Input()
	public disabled!: boolean;

	@Output()
	public buttonClick: EventEmitter<MouseEvent>;

	public constructor() {
		this.text ??= 'Click Me';
		this.disabled ??= false;
		this.buttonClick = new EventEmitter();
	}

	public onNativeClick(event: MouseEvent): void {
		this.buttonClick.emit(event);
	}
}
