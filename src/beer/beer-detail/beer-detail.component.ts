import { Component, OnInit } from '@angular/core';
import * as fromBeer from '../beer.reducer';
import * as beerSelectors from '../beer.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBeer } from '../../shared/models';
import { tap } from 'rxjs/operators';
import { BeerService } from '../beer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteNames } from '../../routes';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: [ './beer-detail.component.scss' ]
})

export class BeerDetailComponent implements OnInit {
  isAdmin: boolean = false;
  item$: Observable<IBeer>;
  isLoaded: boolean = false;

  constructor(
    private store: Store<fromBeer.BeerState>,
    private beerService: BeerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.item$ = this.store.select(beerSelectors.getSelected).pipe(
      tap(beer => {
        if (!beer && !this.isLoaded) {
          this.isLoaded = true;
          this.beerService.get(this.route.snapshot.params.id);
        }
      })
    );
  }

  back() {
    this.router.navigate([ RouteNames.Beer ]);
  }
}
