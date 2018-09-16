import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';

import { IBeer } from '../shared/models';
import * as BeerActions from './beer.actions';
import * as fromBeer from './beer.reducer';
import * as beerSelectors from './beer.selectors';

import { UIService } from '../shared/ui.service';
import { BaseFirebaseService } from '../shared/shared.module';
import { ICollectionService } from '../shared/interfaces/collection-service.interface';


@Injectable()
export class BeerService extends BaseFirebaseService<IBeer> implements ICollectionService {
  constructor(
    protected db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromBeer.State>,
    protected router: Router
  ) {
    super(
      uiService,
      store,
      db,
      BeerActions,
      beerSelectors,
      router,
      'beers'
    );

    this.baseInit();
  }
}
