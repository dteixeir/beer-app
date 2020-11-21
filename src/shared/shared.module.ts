import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { UIService } from './ui/ui.service';

import * as SharedComponents from './components';
import { LetAsDirective } from './directives/let-as.directive';

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
    , LetAsDirective
  ],
  exports: [
    CommonModule
    , FormsModule
    , MaterialModule
    , SharedComponents.CollectionComponent
    , SharedComponents.DetailButtonBarComponent
    , LetAsDirective
  ],
  providers: [
    UIService
  ]
}) export class SharedModule { }
