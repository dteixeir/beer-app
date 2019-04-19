import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { UIService } from './ui/ui.service';

import * as SharedComponents from './components';

@NgModule({
  imports: [
    CommonModule
    , ReactiveFormsModule
    , FormsModule
    , MaterialModule
  ],
  declarations: [
    SharedComponents.CollectionComponent
    , SharedComponents.DetailButtonBarComponent
  ],
  exports: [
    CommonModule
    , FormsModule
    , MaterialModule
    , SharedComponents.CollectionComponent
    , SharedComponents.DetailButtonBarComponent
  ],
  providers: [
    UIService
  ]
}) export class SharedModule { }
