import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { UIService } from '../shared/ui/ui.service';

import { AuthRoutingModule } from './auth-routing.module';

import { AngularFireAuthModule } from '@angular/fire/auth';

export {
  LoginComponent,
  SignupComponent,
  AuthService
};

@NgModule({
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule
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
