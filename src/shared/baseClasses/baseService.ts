import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/app.reducer';
import * as UiActions from '../ui.actions';
import { UIService } from '../ui.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { skipWhile } from 'rxjs/operators';

@Injectable()
export class BaseService {
  public isAuth$: Observable<boolean>;

  constructor(
    protected uiService: UIService,
    protected store: Store<fromRoot.State>,
    protected db: AngularFirestore
  ) { }

  baseInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated).pipe(skipWhile(isAuthenticated => isAuthenticated));
  }

  baseError(error: Error, message: string = null) {
    this.store.dispatch(new UiActions.StopLoading());

    const errorMessage = message || error.message;
    this.uiService.showSnackBar(errorMessage, null);
  }
}
