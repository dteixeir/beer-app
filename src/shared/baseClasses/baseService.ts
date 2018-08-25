import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/app.reducer';
import * as UiActions from '../ui.actions';
import { UIService } from '../ui.service';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { IBase } from './base.model';

@Injectable()
export class BaseService {
  public isAuth$: Observable<boolean>;
  protected pageSize: number = 15;
  protected debounceTime: number = 500;

  constructor(
    protected uiService: UIService,
    protected store: Store<fromRoot.State>
  ) { }

  baseInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated).pipe(skipWhile(isAuthenticated => isAuthenticated));
  }

  baseError(error: Error, message: string = null) {
    console.log(error);
    this.store.dispatch(new UiActions.StopLoading());

    const errorMessage = message || error.message;
    this.uiService.showSnackBar(errorMessage, null);
  }

  pipeMapType<T extends IBase>() {
    return map((data: DocumentChangeAction<{}>[]) => {
      return data.map((doc: DocumentChangeAction<{}>) => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        } as T;
      }) as T[];
    });
  }
}
