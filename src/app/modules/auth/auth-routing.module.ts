import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'sign-in',
			},
			{
				path: 'sign-in',
				component: SignInComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
