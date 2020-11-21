import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable, forkJoin, Subject } from 'rxjs';
import { map, take, tap, switchMap, debounceTime, takeWhile, concatMap, withLatestFrom } from 'rxjs/operators';

import * as fromRoot from '../../app/store/app.reducer';
import * as UiActions from '../ui/ui.actions';
import { UIService } from '../ui/ui.service';
import { IBase } from './base.interface';
import { BaseService } from './base.service';
import { IFirebasePager } from './firebase-pager.interface';
import { IPagerData } from '@fromBrewery';

export class BaseFirebaseService<IItem extends IBase> extends BaseService {
  protected debounceTime: number = 500;
  protected orderBy: string = 'name';

  private _filterItems: Subject<string> = new Subject();
  private filterItems$ = this._filterItems;

  private filterValue: string;

  // collection related
  private _changePage: Subject<IFirebasePager> = new Subject();
  private changePage$ = this._changePage;
  private itemNames: string[] = [];

  constructor(
    protected uiService: UIService,
    protected store: Store<fromRoot.State>,
    protected db: AngularFirestore,
    protected actions,
    protected selectors,
    protected router: Router,
    protected collectionName: string
  ) {
    super(
      uiService,
      db
    );

    this.setFilterObservable();
    this.setPageObservable();
  }

  getPagerData$ = (): Observable<IPagerData> => this.store.select(this.selectors.getPagerData());

  // actions based upon subscriptions
  // public
  hasPreviousPage = (): boolean => this.itemNames.length === 0;

  getFilterValue = () => this.filterValue;

  getListByIds(listIds: string[], collectionName: string): Observable<{}> {
    const observables: Observable<{}>[] = [];

    listIds.forEach(id => {
      observables.push(this.db
        .collection(collectionName)
        .doc(id)
        .snapshotChanges()
        .pipe(
          take(1),
          this.pipeMapType()
        ));
    });

    return forkJoin(observables);
  }

  // collection base
  get(id: string | null = null) {
    id ? this.getSingle(id) : this.getCollection();
  }

  private getSingle(id: string): void {
    this.db
      .collection(this.collectionName)
      .doc(id)
      .snapshotChanges()
      .pipe(
        tap(val => console.log('fetched beer from db')),
        take(1),
        this.pipeMapType()
      ).subscribe((beer: IItem) => {
        this.store.dispatch(new this.actions.SetSelected(beer))
      });
  }

  private getCollection(): void {
    this.store.dispatch(new UiActions.StartLoading());

    // collection name hard coded!
    this.getPagerData$().pipe(
      concatMap((data) => {
        return this.db
          .collection(this.collectionName, ref => ref
            .orderBy(this.orderBy)
            .limit(data.pageSize)
            .startAt(data.pageNumber * data.pageSize)
          ).snapshotChanges().pipe(
            tap(val => console.log('fetched items from db')),
            take(1),
            this.pipeMapArray()
          )
      })
    ).subscribe((items: IItem[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new this.actions.SetCollection(items));
    }, (error) => this.baseError(error, 'Fetching items failed'));
  }

  setSelected(item: IItem, selectedRoute: string) {
    this.store.dispatch(new this.actions.SetSelected(item));
    this.router.navigate([selectedRoute, '/' + item.id]);
  }

  filter(filterValue: string) {
    this.filterValue = filterValue;
    this.store.dispatch(new UiActions.StartLoading());
    this._filterItems.next(filterValue);
  }

  // ------------------------------------------------------------------
  // collection based functions
  // ------------------------------------------------------------------

  // still need to clean this up upon log out. These subscriptions need to get cleared out with take until auth?
  private getFilterQuery(filterValue: string | null) {
    if (filterValue) {
      return this.db
        .collection(this.collectionName, ref => ref
          .orderBy(this.orderBy)
          .limit(this.pageSize)
          .startAt(filterValue)
          .endAt(filterValue + '\uf8ff')
        )
        .snapshotChanges();
    } else {
      return this.db
        .collection(this.collectionName, ref => ref
          .orderBy(this.orderBy)
          .limit(this.pageSize)
        ).snapshotChanges();
    }
  }

  private setFilterObservable() {
    this.filterItems$.pipe(
      debounceTime(this.debounceTime),
      takeWhile(filterValue => filterValue != null || filterValue !== ''),
      switchMap(filterValue => this.getFilterQuery(filterValue)),
      this.pipeMapArray()
    ).subscribe((items: IItem[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new this.actions.SetCollection(items));
    }, (error) => this.baseError(error, 'Fetching items failed'));
  }

  pageNext() {
    this.store.dispatch(new this.actions.IncrementPage);

    this.store.select(this.selectors.getItems)
      .pipe(
        take(1),
        tap(val => console.log('fetched items from db'))
      ).subscribe((items: IItem[]) => {
        this.itemNames.push(items[0].name);
        const newFirebasePager: IFirebasePager = { name: items[items.length - 1].name, pageDirection: 'next' };
        this._changePage.next(newFirebasePager);
      });
  }

  pagePrevious() {
    this.store.dispatch(new this.actions.DecrementPage);

    this.store.select(this.selectors.getItems)
      .pipe(
        take(1),
        tap(val => console.log('fetched items from db'))
      ).subscribe((items: IItem[]) => {
        const newFirebasePager: IFirebasePager = { name: items[0].name, pageDirection: 'previous' };
        this._changePage.next(newFirebasePager);
      });
  }

  // private
  private setPageObservable() {
    this.changePage$.pipe(
      withLatestFrom(this.getPagerData$())
      , switchMap(([firebasePager, pagerData]) => {
        if (firebasePager.pageDirection === 'next') {
          return this.db
            .collection(this.collectionName, ref => ref
              .orderBy(this.orderBy)
              .limit(pagerData.pageSize)
              .startAfter(firebasePager.name))
            .snapshotChanges();
        } else {
          const name = this.itemNames[this.itemNames.length - 1];

          this.itemNames.pop();
          return this.db
            .collection(this.collectionName, ref => ref
              .orderBy(this.orderBy)
              .limit(pagerData.pageSize)
              .startAt(name))
            .snapshotChanges();
        }
      }),
      this.pipeMapArray()
    ).subscribe((items: IItem[]) => {
      this.store.dispatch(new UiActions.StopLoading());
      this.store.dispatch(new this.actions.SetCollection(items));
    }, (error) => this.baseError(error, 'Fetching items failed'));
  }

  // ------------------------------------------------------------------
  // helper functions
  // ------------------------------------------------------------------

  // map list
  pipeMapArray<T extends IBase>() {
    return map((data: DocumentChangeAction<T>[]) => {
      return data.map((doc: DocumentChangeAction<T>) => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        } as T;
      }) as T[];
    });
  }

  // map single item
  pipeMapType<T extends IBase>() {
    return map((doc: any) => {
      return {
        id: doc.payload.id,
        ...doc.payload.data()
      } as T;
    });
  }
}
