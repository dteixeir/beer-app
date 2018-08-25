import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BeerService } from './beer.service';
import { UIService } from '../shared/ui.service';
import { SharedModule } from '../shared/shared.module';
import { BeerRoutingModule } from './beer-routing.module';

import { StoreModule } from '@ngrx/store';
import { beerReducer } from './beer.reducer';
import { BeerComponent } from './beer.component';

export {
  BeerComponent
};

const components = [
  BeerComponent
];

@NgModule({
  imports: [
    BeerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('beer', beerReducer)
  ],
  providers: [
    BeerService,
    UIService
  ],
  exports: components,
  declarations: components
}) export class BeerModule { }
