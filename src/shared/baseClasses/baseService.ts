import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../app/store/app.reducer';
import * as UiActions from '../ui/ui.actions';
import { UIService } from '../ui/ui.service';
import { skipWhile } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class BaseService {
  public isAuth$: Observable<boolean>;

  constructor(
    protected uiService: UIService,
    protected store: Store<fromRoot.State>,
    protected db: AngularFirestore
  ) { }

  baseInit(): void {
    this.isAuth$ = this.store.pipe(
      select(fromRoot.getIsAuthenticated)
      , skipWhile(isAuthenticated => isAuthenticated)
    );
  }

  baseError(error: Error, message: string = null) {
    this.store.dispatch(new UiActions.StopLoading());

    const errorMessage = message || error.message;
    this.uiService.showSnackBar(errorMessage, null);
  }
}
