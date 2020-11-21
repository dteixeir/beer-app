import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromBeer from '../store';
import { BeerService } from '../beer.service';
import { ROUTE_NAMES } from '@shared/constants';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: [ './beer-detail.component.scss' ]
})

export class BeerDetailComponent implements OnInit {
  isAdmin: boolean = false;
  item$: Observable<fromBeer.IBeer>;
  isLoaded: boolean = false;

  constructor(
    private store: Store<fromBeer.BeerState>,
    private beerService: BeerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.item$ = this.store.select(fromBeer.getSelected).pipe(
      tap(beer => {
        if (!beer && !this.isLoaded) {
          this.isLoaded = true;
          this.beerService.get(this.route.snapshot.params.id);
        }
      })
    );
  }

  back() {
    this.router.navigate([ ROUTE_NAMES.Beer ]);
  }
}
