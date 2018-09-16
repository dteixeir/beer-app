import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BreweryService } from './brewery.service';
import { UIService } from '../shared/ui.service';
import { SharedModule } from '../shared/shared.module';
import { BreweryRoutingModule } from './brewery-routing.module';

import { StoreModule } from '@ngrx/store';
import { breweryReducer } from './brewery.reducer';
import { BreweryCollectionComponent } from './brewery-collection/brewery-collection.component';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';

export {
  BreweryCollectionComponent,
  BreweryDetailComponent
};

const components = [
  BreweryCollectionComponent,
  BreweryDetailComponent
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
