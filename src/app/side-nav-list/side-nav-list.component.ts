import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuth from '@fromAuth';
import { ROUTES } from '@shared/constants';
import { IRoute } from '@shared/interfaces';
import { timeInterval, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
  routes: IRoute[] = ROUTES;
  isAuthenticated$: Observable<boolean>;
  test$: Observable<number>;

  constructor(
    private store: Store<fromAuth.State>
  ) { }

  @Output() emit = new EventEmitter<void>();

  onEmit() {
    this.emit.emit();
  }

  ngOnInit(): void {
    this.test$  = interval(1000);

    this.isAuthenticated$ = this.store.select(fromAuth.getIsAuthenticated).pipe(
      tap(x => console.log('test', x))
    );
  }
}
