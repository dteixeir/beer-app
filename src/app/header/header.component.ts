import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '@fromAuth';
import { IRoute } from '@shared/interfaces';
import { ROUTES } from '@shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routes: IRoute[] = ROUTES;
  isAuthenticated$: Observable<boolean>;
  
  @Output() emit = new EventEmitter<void>();

  constructor(
    private store: Store<fromAuth.State>
  ) {  }

  onEmit(): void {
    this.emit.emit();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(
      select(fromAuth.getIsAuthenticated)
    );
  }
}
