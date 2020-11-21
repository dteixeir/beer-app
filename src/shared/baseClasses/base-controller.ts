import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class BaseController<T> {
  public isLoading$: Observable<boolean>;

  constructor(
    protected store: Store<T>
  ) { }
}
