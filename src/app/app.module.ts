import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
