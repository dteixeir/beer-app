import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreweryComponent } from './brewery.component';

const routes: Routes = [
  { path: '', component: BreweryComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class BreweryRoutingModule { }
