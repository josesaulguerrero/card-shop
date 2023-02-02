import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeckComponent } from './pages/deck/deck.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RechargeComponent } from './pages/recharge/recharge.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'deck',
			},
			{
				path: 'deck',
				component: DeckComponent,
			},
			{
				path: 'recharge',
				component: RechargeComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
