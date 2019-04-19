import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '@fromRoot';
import { Routes } from '../../routes';
import { IRoute } from '../route.interface';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
  routes: IRoute[] = Routes;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  @Output() emit = new EventEmitter<void>();

  onEmit() {
    this.emit.emit();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }
}
