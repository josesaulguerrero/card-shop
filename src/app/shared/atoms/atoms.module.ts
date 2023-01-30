import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthButtonComponent } from './auth-button/auth-button.component';
import { IconComponent } from './icon/icon.component';
import { TextComponent } from './text/text.component';

@NgModule({
	declarations: [AuthButtonComponent, IconComponent, TextComponent],
	imports: [CommonModule],
	exports: [AuthButtonComponent, IconComponent, TextComponent],
})
export class AtomsModule {}
