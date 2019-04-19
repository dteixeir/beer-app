import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@fromRoot';

import { Routes } from '../../routes';
import { IRoute } from '../route.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routes: IRoute[] = Routes;
  isAuthenticated$: Observable<boolean>;
  @Output() emit = new EventEmitter<void>();

  constructor(
    private store: Store<fromRoot.State>
  ) {  }

  onEmit(): void {
    this.emit.emit();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }
}
