import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';

import { BeerService } from './beer.service';

import { beerReducer } from './store/beer.reducer';
import { BeerCollectionComponent } from './beer-collection/beer-collection.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { SharedModule } from '@shared/shared.module';

const components = [
  BeerCollectionComponent,
  BeerDetailComponent
];

const routes: Routes = [
  {
    path: '',
    component: BeerCollectionComponent
  },
  {
    path: ':id',
    component: BeerDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('beer', beerReducer),
    RouterModule.forChild(routes)
  ],
  providers: [
    BeerService
  ],
  exports: components,
  declarations: components
}) export class BeerModule { }
