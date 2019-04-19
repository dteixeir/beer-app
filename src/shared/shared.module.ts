import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

import { UIService } from './ui/ui.service';
import { BaseController } from './baseClasses/baseController';
import { BaseService } from './baseClasses/baseService';
import { BaseFirebaseService } from './baseClasses/baseFirebaseService';

import * as SharedComponents from './components';

export {
  BaseService,
  BaseFirebaseService,
  BaseController,
  UIService
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    SharedComponents.CollectionComponent,
    SharedComponents.DetailButtonBarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedComponents.CollectionComponent,
    SharedComponents.DetailButtonBarComponent
  ],
  providers: [
    UIService
  ]
}) export class SharedModule { }
