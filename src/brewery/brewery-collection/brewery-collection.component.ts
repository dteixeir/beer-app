import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromBrewery from '../brewery.reducer';
import * as brewerySelectors from '../brewery.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBrewery } from '../../shared/models';
import { BreweryService } from '../brewery.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-brewery-collection',
  templateUrl: './brewery-collection.component.html',
  styleUrls: [ './brewery-collection.component.scss' ]
})
export class BreweryCollectionComponent implements OnInit {
  collection$: Observable<IBrewery[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private store: Store<fromBrewery.State>,
    private breweryService: BreweryService
  ) { }

  ngOnInit(): void {
    this.collection$ = this.store.select(brewerySelectors.getItems);
    this.breweryService.get();
  }
}
