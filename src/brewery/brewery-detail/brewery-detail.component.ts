import { Component, OnInit } from '@angular/core';
import * as fromBrewery from '../brewery.reducer';
import * as BrewerySelectors from '../brewery.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { IBrewery, Brewery } from '../../shared/models';
import { BreweryService } from '../brewery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery-detail.component.html',
  styleUrls: [ './brewery-detail.component.scss' ]
})
export class BreweryDetailComponent implements OnInit {
  brewery$: Observable<IBrewery>;
  isLoaded: boolean = false;

  constructor(
    private store: Store<fromBrewery.State>,
    private breweryService: BreweryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.brewery$ = this.store.select(BrewerySelectors.getSelected).pipe(
      tap(brewery => {
        if (!brewery && !this.isLoaded) {
          this.isLoaded = true;
          this.breweryService.get(this.route.snapshot.params.id);
        }
      })
    );

    this.subscribeForBeers();
  }

  subscribeForBeers() {
    this.brewery$
      .pipe(
        distinctUntilChanged((a: Brewery, b: Brewery) => {
          return !a || a.name === b.name;
        }),
        tap(val => console.log(val))
      )
      .subscribe(brewery => {
        if (brewery) {
          this.breweryService.getBreweryBeers(brewery);
        }
      });
  }
}
