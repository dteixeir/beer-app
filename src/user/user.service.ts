import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { takeUntil, take, skipUntil } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { UIService } from '../shared/ui/ui.service';
import { IUser } from './store/user.interface';

import * as fromRoot from '../app/store/app.reducer';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseService } from '@shared/baseClasses';
import { COLLECTIONS } from 'src/constants';

@Injectable()
export class UserService extends BaseService {
  public hasUser$: Observable<IUser>;

  constructor(
    protected db: AngularFirestore,
    protected uiService: UIService,
    protected store: Store<fromRoot.State>
  ) {
    super(
      uiService,
      store,
      db
    );

    this.baseInit();
  }

  checkForUser() {
    this.store.select(fromRoot.getUser)
      .pipe(
        skipUntil(this.store.select(fromRoot.getHasUser)),
        takeUntil(this.isAuth$)
      )
      .subscribe(user => {
        this.db.collection(COLLECTIONS.USERS)
          .doc(user.userId)
          .snapshotChanges()
          .pipe(
            take(1),
            takeUntil(this.isAuth$)
          )
          .subscribe(data => {
            if (!data.payload.exists) {
              this.createUserEntity(user);
            }
          }, (error) => this.baseError(error));
      }, (error) => this.baseError(error));
  }

  createUserEntity(user: IUser) {
    this.db.doc(`users/${user.userId}`).set({
      userId: user.userId,
      email: user.email
    });
  }
}
