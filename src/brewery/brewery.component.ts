import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromBrewery from './brewery.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBrewery } from './brewery.model';
import { BreweryService } from './brewery.service';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-brewery',
  templateUrl: './brewery.component.html',
  styleUrls: [ './brewery.component.scss' ]
})
export class BreweryComponent implements OnInit {
  breweries$: Observable<IBrewery[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private store: Store<fromBrewery.State>,
    private breweryService: BreweryService
  ) { }

  ngOnInit(): void {
    this.breweries$ = this.store.select(fromBrewery.getBreweries);
    this.breweryService.getBreweries();
  }

  nextPage() {
    this.breweryService.pageNext();
  }

  previousPage() {
    this.breweryService.pagePrevious();
  }

  hasPreviousPage() {
    return this.breweryService.hasPreviousPage();
  }

  filter(filterValue: string) {
    this.breweryService.filterBreweries(filterValue);
  }
}
