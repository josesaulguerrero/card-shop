import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthButtonComponent } from './auth-button/auth-button.component';
import { IconComponent } from './icon/icon.component';
import { TextComponent } from './text/text.component';
import { TitleComponent } from './title/title.component';

@NgModule({
	declarations: [
		AuthButtonComponent,
		IconComponent,
		TextComponent,
		TitleComponent,
	],
	imports: [CommonModule],
	exports: [
		AuthButtonComponent,
		IconComponent,
		TextComponent,
		TitleComponent,
	],
})
export class AtomsModule {}
