import { Subject } from 'rxjs';
import { switchMap, take, debounceTime, takeWhile, map } from 'rxjs/operators';
import { Query } from '@firebase/firestore-types';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';

import { IBeer } from './beer.model';
import * as BeerActions from './beer.actions';
import * as fromBeer from './beer.reducer';

import { UIService } from '../shared/ui.service';
import * as UiActions from '../shared/ui.actions';
import { BaseService } from '../shared/shared.module';
import { IFirebasePager } from '../shared/baseClasses/firebase-pager.model';

@Injectable()
export class BeerService extends BaseService {
  private _changePage: Subject<IFirebasePager> = new Subject();
  private changePage$ = this._changePage;

  private _filterBeers: Subject<string> = new Subject();
  private filterBeers$ = this._filterBeers;

  private beerNames: string[] = [];

  constructor(
    private db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromBeer.State>
  ) {
    super(
      uiService,
      store
    );

    this.baseInit();

    this.setFilterObservable();
    this.setPageObservable();
    this.test();
  }

  // set next stage of subjects
  filterBeers(filterValue: string) {
    this.store.dispatch(new UiActions.StartLoading());
    this._filterBeers.next(filterValue);
  }

  pageNext() {
    this.store.select(fromBeer.getBeers)
      .pipe(take(1))
      .subscribe((beers: IBeer[]) => {
        this.beerNames.push(beers[0].name);
        const newFirebasePager: IFirebasePager = { name: beers[ beers.length - 1 ].name, pageDirection: 'next' };
        this._changePage.next(newFirebasePager);
      });
  }

  pagePrevious() {
    this.store.select(fromBeer.getBeers)
      .pipe(take(1))
      .subscribe((beers: IBeer[]) => {
        const newFirebasePager: IFirebasePager = { name: beers[ 0 ].name, pageDirection: 'previous' };
        this._changePage.next(newFirebasePager);
      });
  }

  // actions based upon subscriptions
  // public
  hasPreviousPage(): boolean {
    return this.beerNames.length === 0;
  }

  test() {
    this.db.collection('breweryBeers', ref => {
      return ref.doc('03JpIzNFct1TyXE3lGcC').collection('beers').limit(10);

      // return ref;

    })
    .snapshotChanges()
    .pipe(map(values => console.log(values)))
    .subscribe((beers) => {
      console.log('beers', beers);
      this.store.dispatch(new UiActions.StopLoading());
    }, (error) => this.baseError(error, 'Fetching beers failed'));
  }

  getBeers() {
    this.store.dispatch(new UiActions.StartLoading());

    this.test();

    return this.db
      .collection('beers', ref => ref
        .orderBy('name')
        .limit(this.pageSize)
      ).snapshotChanges()
      .pipe(
        this.pipeMapType()
      ).subscribe((beers: IBeer[]) => {
        this.store.dispatch(new UiActions.StopLoading());
        this.store.dispatch(new BeerActions.SetBeers(beers));
      }, (error) => this.baseError(error, 'Fetching beers failed'));
  }

    // private
  private setPageObservable() {
    this.changePage$.pipe(
      switchMap((firebasePager: IFirebasePager) => {
        if (firebasePager.pageDirection === 'next') {
          return this.db
            .collection('beers', ref => ref
              .orderBy('name')
              .limit(this.pageSize)
              .startAfter(firebasePager.name))
            .snapshotChanges();
        } else {
          const name = this.beerNames[ this.beerNames.length - 1 ];
          this.beerNames.pop();
          return this.db
            .collection('beers', ref => ref
              .orderBy('name')
              .limit(this.pageSize)
              .startAt(name))
            .snapshotChanges();
        }
      }),
      this.pipeMapType()
    ).subscribe((beers: IBeer[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new BeerActions.SetBeers(beers));
    }, (error) => this.baseError(error, 'Fetching beers failed'));
  }

  // still need to clean this up upon log out. These subscriptions need to get cleared out with take until auth?
  private getFilterQuery(filterValue: string | null) {
    if (filterValue) {
      return this.db
        .collection('beers', ref => ref
          .orderBy('name')
          .limit(this.pageSize)
          .startAt(filterValue)
          .endAt(filterValue + '\uf8ff')
        )
        .snapshotChanges();
    } else {
      return this.db
        .collection('beers', ref => ref
          .orderBy('name')
          .limit(this.pageSize)
        ).snapshotChanges();
    }
  }

  private setFilterObservable() {
    this.filterBeers$.pipe(
      debounceTime(this.debounceTime),
      takeWhile(filterValue => filterValue != null || filterValue !== ''),
      switchMap(filterValue => {
        return this.getFilterQuery(filterValue);
      }),
      this.pipeMapType()
    )
    .subscribe((beers: IBeer[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new BeerActions.SetBeers(beers));
    }, (error) => this.baseError(error, 'Fetching beers failed'));
  }
}
