import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromBeer from './beer.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBeer } from './beer.model';
import { BeerService } from './beer.service';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: [ './beer.component.scss' ]
})
export class BeerComponent implements OnInit {
  collection$: Observable<IBeer[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private store: Store<fromBeer.State>,
    private beerService: BeerService
  ) { }

  ngOnInit(): void {
    this.collection$ = this.store.select(fromBeer.getBeers);
    this.beerService.getBeers();
  }

  nextPage() {
    this.beerService.pageNext();
  }

  previousPage() {
    this.beerService.pagePrevious();
  }

  hasPreviousPage() {
    return this.beerService.hasPreviousPage();
  }

  filter(filterValue: string) {
    this.beerService.filterBeers(filterValue);
  }
}
