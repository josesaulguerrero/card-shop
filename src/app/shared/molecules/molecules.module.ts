import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AtomsModule } from '../atoms/atoms.module';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PurchasableCardComponent } from './purchasable-card/purchasable-card.component';
import { DeckCardComponent } from './deck-card/deck-card.component';

@NgModule({
	declarations: [
		PokemonCardComponent,
		PurchasableCardComponent,
		DeckCardComponent,
	],
	imports: [CommonModule, AtomsModule],
	exports: [
		PokemonCardComponent,
		PurchasableCardComponent,
		DeckCardComponent,
	],
})
export class MoleculesModule {}
