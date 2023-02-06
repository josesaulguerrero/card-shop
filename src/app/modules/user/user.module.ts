import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AtomsModule } from '../../shared/atoms/atoms.module';
import { MoleculesModule } from '../../shared/molecules/molecules.module';
import { OrganismsModule } from '../../shared/organisms/organisms.module';
import { AuthModule } from '../auth/auth.module';
import { DeckComponent } from './pages/deck/deck.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RechargeComponent } from './pages/recharge/recharge.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
	declarations: [LayoutComponent, DeckComponent, RechargeComponent],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		UserRoutingModule,
		AuthModule,
		AtomsModule,
		MoleculesModule,
		OrganismsModule,
		SharedModule,
	],
	exports: [LayoutComponent, DeckComponent, RechargeComponent],
})
export class UserModule {}
