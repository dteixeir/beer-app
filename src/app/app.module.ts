import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

import { AuthModule, AuthService } from '../auth/auth.module';
import { WelcomeComponent } from '../welcome/welcome.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from '../navigation/header/header.component';
import { SideNavListComponent } from '../navigation/side-nav-list/side-nav-list.component';

import { environment } from './../environments/environment';
import { UIService } from '../shared/ui/ui.service';
import { ModalModule } from '../modals/modal.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserModule, UserService } from '../user/user.module';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SideNavListComponent
  ],
  imports: [
    AppRoutingModule,
    UserModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    ModalModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),

    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [ UIService, AuthService, UserService ],
  bootstrap: [ AppComponent ],
  entryComponents: [

  ]
})
export class AppModule { }
