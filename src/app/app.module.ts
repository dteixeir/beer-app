import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';

import { AuthModule } from '../auth/auth.module';
import { WelcomeComponent } from '../welcome/welcome.component';

import { HeaderComponent } from '../navigation/header/header.component';
import { SideNavListComponent } from '../navigation/side-nav-list/side-nav-list.component';

import { environment } from './../environments/environment';
import { ModalModule } from '../modals/modal.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserModule } from '../user/user.module';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'brewery', loadChildren: '../brewery/brewery.module#BreweryModule' },
  { path: 'beer', loadChildren: '../beer/beer.module#BeerModule' }
];

@NgModule({
  declarations: [
    AppComponent
    , WelcomeComponent
    , HeaderComponent
    , SideNavListComponent
  ],
  imports: [
    UserModule
    , AuthModule
    , BrowserAnimationsModule
    , BrowserModule
    , MaterialModule
    , ModalModule
    , AngularFirestoreModule
    , StoreModule.forRoot(reducers)
    , RouterModule.forRoot(routes)
    , StoreDevtoolsModule.instrument({ maxAge: 20 })
    , AngularFireModule.initializeApp(environment.firebase)
  ]
  , providers: []
  , entryComponents: []
  , bootstrap: [AppComponent]
})
export class AppModule { }
