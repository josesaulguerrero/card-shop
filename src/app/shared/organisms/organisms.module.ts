import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

@NgModule({
	declarations: [SignInFormComponent, NavbarComponent],
	imports: [CommonModule, AtomsModule, MoleculesModule],
	exports: [SignInFormComponent, NavbarComponent],
})
export class OrganismsModule {}
