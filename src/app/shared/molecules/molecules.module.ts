import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtomsModule } from '../atoms/atoms.module';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PurchasableCardComponent } from './purchasable-card/purchasable-card.component';

@NgModule({
	declarations: [PokemonCardComponent, PurchasableCardComponent],
	imports: [CommonModule, AtomsModule],
	exports: [PokemonCardComponent, PurchasableCardComponent],
})
export class MoleculesModule {}
