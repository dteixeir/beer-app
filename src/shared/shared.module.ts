import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { UIService } from '../shared/ui.service';
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
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    SharedComponents.CollectionComponent,
    SharedComponents.DetailButtonBarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedComponents.CollectionComponent,
    SharedComponents.DetailButtonBarComponent
  ],
  providers: [
    UIService
  ]
}) export class SharedModule { }
