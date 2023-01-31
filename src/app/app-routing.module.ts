import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
	canActivate,
	redirectUnauthorizedTo,
	redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth',
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then(
				(module) => module.AuthModule,
			),
		...canActivate(() => redirectLoggedInTo('shop')),
	},
	{
		path: 'shop',
		loadChildren: () =>
			import('./modules/shop/shop.module').then(
				(module) => module.ShopModule,
			),
		...canActivate(() => redirectUnauthorizedTo('auth')),
	},
	{
		path: '**',
		redirectTo: 'auth',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
