import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take, skipUntil } from 'rxjs/operators';

import { UIService } from '../shared/ui/ui.service';
import * as fromUser from './store';

import * as fromUI from '@shared/ui';
import * as fromAuth from '@fromAuth';
import { BaseService } from '@shared/baseClasses';
import { COLLECTIONS } from '@shared/constants';

@Injectable()
export class UserService extends BaseService {
  public hasUser$: Observable<fromUser.IUser>;

  constructor(
    protected db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromUser.State>
  ) {
    super(
      uiService,
      db
    );

    super.init();
  }

  isAuthenticated = () => fromAuth.getIsAuthenticated;
  stopLoading = () => new fromUI.StopLoading();

  checkForUser() {
    this.store.select(fromUser.getUser)
      .pipe(
        skipUntil(this.store.select(fromUser.getHasUser))
      )
      .subscribe(user => {
        this.db
          .collection(COLLECTIONS.USERS)
          .doc(user.userId)
          .snapshotChanges()
          .pipe(
            take(1)
          )
          .subscribe(data => {
            if (!data.payload.exists) {
              this.createUserEntity(user);
            }
          }, (error) => super.baseError(error));
      }, (error) => super.baseError(error));
  }

  createUserEntity(user: fromUser.IUser) {
    this.db.doc(`users/${user.userId}`).set({
      userId: user.userId,
      email: user.email
    });
  }
}
