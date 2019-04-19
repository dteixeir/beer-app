import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '@fromRoot';

@Injectable()
export class AuthGard implements CanActivate, CanLoad {

  constructor(
    private store: Store<fromRoot.State>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

  canLoad(route: Route) {
    return true;
    // return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }
}
