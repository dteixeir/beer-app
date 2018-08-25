import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BreweryService } from './brewery.service';
import { UIService } from '../shared/ui.service';
import { SharedModule } from '../shared/shared.module';
import { BreweryRoutingModule } from './brewery-routing.module';

import { StoreModule } from '@ngrx/store';
import { breweryReducer } from './brewery.reducer';
import { BreweryComponent } from './brewery.component';

export {
  BreweryComponent
};

const components = [
  BreweryComponent
];

@NgModule({
  imports: [
    BreweryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('brewery', breweryReducer)
  ],
  providers: [
    BreweryService,
    UIService
  ],
  exports: components,
  declarations: components
}) export class BreweryModule { }
