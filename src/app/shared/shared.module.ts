import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsEmptyObjPipe } from './pipes/is-empty-obj.pipe';
import { AtomsModule } from './atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';
import { OrganismsModule } from './organisms/organisms.module';

@NgModule({
	declarations: [IsEmptyObjPipe],
	imports: [CommonModule, AtomsModule, MoleculesModule, OrganismsModule],
	exports: [IsEmptyObjPipe],
})
export class SharedModule {}
