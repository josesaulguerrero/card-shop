import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
	declarations: [SignInFormComponent, NavbarComponent, UserDetailsComponent],
	imports: [CommonModule, RouterModule, AtomsModule, MoleculesModule],
	exports: [SignInFormComponent, NavbarComponent, UserDetailsComponent],
})
export class OrganismsModule {}
