import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeerCollectionComponent } from './beer-collection/beer-collection.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

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
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class BeerRoutingModule { }
