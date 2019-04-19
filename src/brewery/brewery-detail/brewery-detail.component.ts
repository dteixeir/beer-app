import { Component, OnInit } from '@angular/core';
import * as fromBrewery from '../store/brewery.reducer';
import * as BrewerySelectors from '../store/brewery.selectors';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { tap, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { IBeer } from '@fromBeer';
import { BreweryService } from '../brewery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase';
import { IBrewery } from '../store';

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
    private router: Router,
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
      distinctUntilChanged((a: IBrewery, b: IBrewery) => !a || a.name === b.name)
      , map(brewery => brewery.beerRefs.map(ref => ref.get().then(x => {
        return {
          ...x.data()
          , id: ref.id
        } as IBeer
      })))
      , switchMap((promises: Promise<IBeer>[]) => forkJoin(promises))
    );
  }

  select(beer: firestore.DocumentSnapshot) {
    this.router.navigate(['/beer', beer.id]);
  }
}
