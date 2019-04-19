import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as BreweryActions from './store/brewery.actions';
import * as fromBrewery from './store/brewery.reducer';
import * as BrewerySelectors from './store/brewery.selectors';

import { UIService } from '../shared/ui/ui.service';
import { BaseFirebaseService } from '../shared/shared.module';
import { Router } from '@angular/router';
import { ICollectionService } from '../shared/interfaces/collection-service.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBrewery } from './store';

@Injectable()
export class BreweryService extends BaseFirebaseService<IBrewery> implements ICollectionService {
  constructor(
    protected db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromBrewery.State>,
    protected router: Router
  ) {
    super(
      uiService,
      store,
      db,
      BreweryActions,
      BrewerySelectors,
      router,
      'breweries'
    );

    this.baseInit();
  }

  getBreweryBeers(brewery) {
    const newBrewery: IBrewery = brewery;
    newBrewery.beerRefs[0].get().then(doc => console.log(doc.data()))
    // this.getListByIds(newBrewery.beerRefs, 'beers')
    //   .pipe(take(1))
    //   .subscribe((val: IBeer[]) => {
    //     newBrewery.beers = val;

    //     this.store.dispatch(new BreweryActions.SetSelectedBreweryBeers(val));
    //   });
  }
}
