import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtomsModule } from '../../shared/atoms/atoms.module';
import { MoleculesModule } from '../../shared/molecules/molecules.module';
import { OrganismsModule } from '../../shared/organisms/organisms.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
	declarations: [SignInComponent],
	providers: [],
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
