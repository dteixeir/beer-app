import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';

import * as UI from '@shared/ui';
import { BaseService } from '@shared/baseClasses';
import { UIService } from '@shared/ui';
import { ROUTE_NAMES } from '@shared/constants';

import * as fromRoot from '@fromRoot';

import * as fromAuth from './store';
import * as fromUI from '@shared/ui';
import * as USER from '../user/store/user.actions';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    protected uiService: UIService,
    protected store: Store<fromRoot.State>,
    protected db: AngularFirestore
  ) {
    super(
      uiService,
      db
    );
  }

  stopLoading = () => new fromUI.StopLoading();

  initAuthListner() {
    // this.store.select(fromRoot.getIsAuthenticated)
    //   .subscribe(data => {
    //     if (data) {
    //       this.router.navigate([ ROUTE_NAMES.Brewery ]);
    //     } else {
    //       // this.router.navigate([ RouteNames.Login ]);
    //     }
    //   }, (error) => this.baseError(error));

    this.afAuth.authState
      .subscribe(user => {
        if (user) {
          this.store.dispatch(new fromAuth.SetAuthenticated());
          this.store.dispatch(new USER.SetUser({
            userId: user.uid,
            email: user.email
          }));
        } else {
          this.store.dispatch(new USER.SetUser(null));
          this.store.dispatch(new fromAuth.SetUnAuthenticated());
        }
      }, (error) => this.baseError(error));
  }

  registerUser(userAuth: fromAuth.IAuth) {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth.createUserWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    ).then((user) => {
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      this.baseError(error);
    });
  }

  login(userAuth: fromAuth.IAuth) {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.auth.signInWithEmailAndPassword(
      userAuth.email,
      userAuth.password
    ).then(() => {
      setTimeout(() => {
        this.store.dispatch(new UI.StopLoading());
      }, 3000);
    }).catch(error => {
      setTimeout(() => {
        this.baseError(error);
      }, 3000);
    });
  }

  logout() {
    this.store.dispatch(new USER.SetUser(null));
    this.store.dispatch(new fromAuth.SetUnAuthenticated());
    this.afAuth.auth.signOut();
  }
}
