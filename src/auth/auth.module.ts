import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { UIService } from '../shared/ui/ui.service';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    ReactiveFormsModule
    , AngularFireAuthModule
    , SharedModule
    , RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ],
  providers: [
    UIService,
    AuthService
  ]
}) export class AuthModule { }
