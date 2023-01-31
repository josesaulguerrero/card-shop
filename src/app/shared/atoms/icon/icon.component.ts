import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
	@Input()
	public src;

	@Input()
	public altText;

	@Input()
	public width?;

	@Input()
	public height?;

	public constructor() {
		this.src ??= 'https://i.postimg.cc/MTjrsFMb/image.png';
		this.altText ??= 'Custom Icon';
		this.width ??= 50;
		this.height ??= 50;
	}
}
