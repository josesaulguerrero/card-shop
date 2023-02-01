import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
	declarations: [PokemonCardComponent],
	imports: [CommonModule, AtomsModule],
	exports: [PokemonCardComponent],
})
export class MoleculesModule {}
