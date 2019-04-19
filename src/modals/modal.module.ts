import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export {
  ConfirmModalComponent
};

const components = [
  ConfirmModalComponent
];

@NgModule({
  imports: [
    MaterialModule
    , CommonModule
  ],
  exports: components,
  declarations: components,
  entryComponents: [
    ConfirmModalComponent
  ]
}) export class ModalModule { }
