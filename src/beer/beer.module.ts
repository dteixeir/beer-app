import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BeerService } from './beer.service';
import { UIService } from '../shared/ui/ui.service';
import { SharedModule } from '../shared/shared.module';
import { BeerRoutingModule } from './beer-routing.module';

import { StoreModule } from '@ngrx/store';
import { beerReducer } from './store/beer.reducer';
import { BeerCollectionComponent } from './beer-collection/beer-collection.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

export {
  BeerCollectionComponent,
  BeerDetailComponent
};

const components = [
  BeerCollectionComponent,
  BeerDetailComponent
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
