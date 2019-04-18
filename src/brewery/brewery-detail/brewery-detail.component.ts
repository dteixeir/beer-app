import { Component, OnInit } from '@angular/core';
import * as fromBrewery from '../brewery.reducer';
import * as BrewerySelectors from '../brewery.selectors';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { tap, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { IBrewery, Brewery, IBeer } from '../../shared/models';
import { BreweryService } from '../brewery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brewery',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent implements OnInit {
  brewery$: Observable<IBrewery>;
  beers$: Observable<IBeer[]>;
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

    this.beers$ = this.brewery$.pipe(
      distinctUntilChanged((a: Brewery, b: Brewery) => !a || a.name === b.name)
      , map(brewery => brewery.beerRefs.map(ref => ref.get().then(x => x.data() as IBeer)))
      , switchMap((promises: Promise<IBeer>[]) => forkJoin(promises))
    );
  }
}
