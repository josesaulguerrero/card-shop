import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './pages/shop/shop.component';
import { AtomsModule } from 'src/app/shared/atoms/atoms.module';
import { MoleculesModule } from 'src/app/shared/molecules/molecules.module';
import { OrganismsModule } from 'src/app/shared/organisms/organisms.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
	declarations: [ShopComponent],
	imports: [
		CommonModule,
		ShopRoutingModule,
		AtomsModule,
		MoleculesModule,
		OrganismsModule,
		AuthModule,
	],
})
export class ShopModule {}
