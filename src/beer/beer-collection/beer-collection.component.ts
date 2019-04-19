import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromBeer from '../store/beer.reducer';
import * as beerSelectors from '../store/beer.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IBeer } from '@fromBeer';
import { BeerService } from '../beer.service';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-beer-collection',
  templateUrl: './beer-collection.component.html',
  styleUrls: [ './beer-collection.component.scss' ]
})

export class BeerCollectionComponent implements OnInit {
  collection$: Observable<IBeer[]>;
  _filter: Subject<string> = new Subject();
  filter$: Observable<string> = this._filter;
  filterValue: string = '';
  isLoaded: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private store: Store<fromBeer.State>,
    public beerService: BeerService
  ) { }

  ngOnInit(): void {
    this.filter$.subscribe((value) => {
      this.beerService.filter(value);
    });

    const filterValue = this.beerService.getFilterValue();
    if (filterValue) {
      this.filterValue = filterValue;
      this._filter.next(filterValue);
    }

    this.collection$ = this.store.select(beerSelectors.getItems).pipe(
      tap(beers => {
        if ((beers && !beers.length) && !this.isLoaded) {
          this.isLoaded = true;
          this.beerService.get();
        }
      })
    );
  }
}
