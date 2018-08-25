import { Subject } from 'rxjs';
import { switchMap, take, debounceTime, takeWhile } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';

import { IBrewery } from './brewery.model';
import * as BreweryActions from './brewery.actions';
import * as fromBrewery from './brewery.reducer';

import { UIService } from '../shared/ui.service';
import * as UiActions from '../shared/ui.actions';
import { BaseService } from '../shared/shared.module';
import { IFirebasePager } from '../shared/baseClasses/firebase-pager.model';

@Injectable()
export class BreweryService extends BaseService {
  private _changePage: Subject<IFirebasePager> = new Subject();
  private changePage$ = this._changePage;

  private _filterBreweries: Subject<string> = new Subject();
  private filterBreweries$ = this._filterBreweries;

  private breweryNames: string[] = [];

  constructor(
    private db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromBrewery.State>
  ) {
    super(
      uiService,
      store
    );

    this.baseInit();

    this.setFilterObservable();
    this.setPageObservable();
  }

  // set next stage of subjects
  filterBreweries(filterValue: string) {
    this.store.dispatch(new UiActions.StartLoading());
    this._filterBreweries.next(filterValue);
  }

  pageNext() {
    this.store.select(fromBrewery.getBreweries)
      .pipe(take(1))
      .subscribe((breweries: IBrewery[]) => {
        this.breweryNames.push(breweries[0].name);
        const newFirebasePager: IFirebasePager = { name: breweries[ breweries.length - 1 ].name, pageDirection: 'next' };
        this._changePage.next(newFirebasePager);
      });
  }

  pagePrevious() {
    this.store.select(fromBrewery.getBreweries)
      .pipe(take(1))
      .subscribe((breweries: IBrewery[]) => {
        const newFirebasePager: IFirebasePager = { name: breweries[ 0 ].name, pageDirection: 'previous' };
        this._changePage.next(newFirebasePager);
      });
  }

  // actions based upon subscriptions
  // public
  hasPreviousPage(): boolean {
    return this.breweryNames.length === 0;
  }

  getBreweries() {
    this.store.dispatch(new UiActions.StartLoading());

    return this.db
      .collection('breweries', ref => ref
        .orderBy('name')
        .limit(this.pageSize)
      ).snapshotChanges()
      .pipe(
        this.pipeMapType()
      ).subscribe((breweries: IBrewery[]) => {
        this.store.dispatch(new UiActions.StopLoading());
        this.store.dispatch(new BreweryActions.SetBreweries(breweries));
      }, (error) => this.baseError(error, 'Fetching breweries failed'));
  }

    // private
  private setPageObservable() {
    this.changePage$.pipe(
      switchMap((firebasePager: IFirebasePager) => {
        if (firebasePager.pageDirection === 'next') {
          return this.db
            .collection('breweries', ref => ref
              .orderBy('name')
              .limit(this.pageSize)
              .startAfter(firebasePager.name))
            .snapshotChanges();
        } else {
          const name = this.breweryNames[ this.breweryNames.length - 1 ];
          this.breweryNames.pop();
          return this.db
            .collection('breweries', ref => ref
              .orderBy('name')
              .limit(this.pageSize)
              .startAt(name))
            .snapshotChanges();
        }
      }),
      this.pipeMapType()
    ).subscribe((breweries: IBrewery[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new BreweryActions.SetBreweries(breweries));
    }, (error) => this.baseError(error, 'Fetching breweries failed'));
  }

  // still need to clean this up upon log out. These subscriptions need to get cleared out with take until auth?
  private getFilterQuery(filterValue: string | null) {
    if (filterValue) {
      return this.db
        .collection('breweries', ref => ref
          .orderBy('name')
          .limit(this.pageSize)
          .startAt(filterValue)
          .endAt(filterValue + '\uf8ff')
        )
        .snapshotChanges();
    } else {
      return this.db
        .collection('breweries', ref => ref
          .orderBy('name')
          .limit(this.pageSize)
        ).snapshotChanges();
    }
  }

  private setFilterObservable() {
    this.filterBreweries$.pipe(
      debounceTime(this.debounceTime),
      takeWhile(filterValue => filterValue != null || filterValue !== ''),
      switchMap(filterValue => {
        return this.getFilterQuery(filterValue);
      }),
      this.pipeMapType()
    )
    .subscribe((breweries: IBrewery[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new BreweryActions.SetBreweries(breweries));
    }, (error) => this.baseError(error, 'Fetching breweries failed'));
  }
}
