import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { BaseFirebaseService } from '@shared/baseClasses';
import { ICollectionService } from '@shared/interfaces';
import { UIService } from '@shared/ui';

import * as fromBeer from '@fromBeer';

import * as BeerActions from './store/beer.actions';
import * as beerSelectors from './store/beer.selectors';

@Injectable()
export class BeerService extends BaseFirebaseService<fromBeer.IBeer> implements ICollectionService {
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
