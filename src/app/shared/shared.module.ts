import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsEmptyObjPipe } from './pipes/is-empty-obj.pipe';
import { AtomsModule } from './atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';
import { OrganismsModule } from './organisms/organisms.module';
import { FormControlPipe } from './pipes/get-form-control.pipe';

@NgModule({
	declarations: [IsEmptyObjPipe, FormControlPipe],
	imports: [CommonModule, AtomsModule, MoleculesModule, OrganismsModule],
	exports: [IsEmptyObjPipe, FormControlPipe],
})
export class SharedModule {}
