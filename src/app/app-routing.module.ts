import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';

import { AuthGard } from '../auth/auth.gard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'brewery', loadChildren: '../brewery/brewery.module#BreweryModule'}

  // { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [ AuthGard ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ ]
})

export class AppRoutingModule {

}
