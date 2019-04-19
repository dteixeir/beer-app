import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UIService } from '../shared/ui/ui.service';
import { SharedModule } from '../shared/shared.module';

import { UserService } from './user.service';
import { AngularFireAuthModule } from '@angular/fire/auth';

export {
  UserService
};

@NgModule({
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    UIService,
    UserService
  ]
}) export class UserModule { }
