import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreweryCollectionComponent } from './brewery-collection/brewery-collection.component';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';

const routes: Routes = [
  { path: '', component: BreweryCollectionComponent },
  { path: ':id', component: BreweryDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class BreweryRoutingModule { }
