import { Component } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
})
export class ImageComponent extends IconComponent {
	public constructor() {
		super();
		this.altText ??= 'Custom Image';
		this.width ??= 150;
		this.height ??= 150;
	}
}
