import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/app.reducer';


@Injectable()
export class BaseController {
  public isLoading$: Observable<boolean>;

  constructor(
    protected store: Store<fromRoot.State>
  ) { }
}
