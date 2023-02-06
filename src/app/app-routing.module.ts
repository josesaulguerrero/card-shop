import { NgModule } from '@angular/core';
import {
	canActivate,
	redirectLoggedInTo,
	redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth/sign-in',
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
		path: 'user',
		loadChildren: () =>
			import('./modules/user/user.module').then(
				(module) => module.UserModule,
			),
		...canActivate(() => redirectUnauthorizedTo('auth')),
	},
	{
		path: '**',
		redirectTo: 'auth/sign-in',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
