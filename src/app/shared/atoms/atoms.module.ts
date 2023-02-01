import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthButtonComponent } from './auth-button/auth-button.component';
import { IconComponent } from './icon/icon.component';
import { ImageComponent } from './image/image.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
	declarations: [
		AuthButtonComponent,
		IconComponent,
		TextComponent,
		TitleComponent,
		ImageComponent,
		ButtonComponent,
	],
	imports: [CommonModule],
	exports: [
		AuthButtonComponent,
		IconComponent,
		TextComponent,
		TitleComponent,
		ImageComponent,
		ButtonComponent,
	],
})
export class AtomsModule {}
