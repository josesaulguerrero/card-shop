import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@NgModule({
	declarations: [SignInFormComponent],
	imports: [CommonModule, AtomsModule, MoleculesModule],
	exports: [SignInFormComponent],
})
export class OrganismsModule {}
