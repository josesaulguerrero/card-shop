import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtomsModule } from '../../shared/atoms/atoms.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MoleculesModule } from 'src/app/shared/molecules/molecules.module';
import { OrganismsModule } from 'src/app/shared/organisms/organisms.module';

@NgModule({
	declarations: [SignInComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		AtomsModule,
		MoleculesModule,
		OrganismsModule,
	],
	exports: [SignInComponent],
})
export class AuthModule {}
