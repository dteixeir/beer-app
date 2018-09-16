import { Action } from '@ngrx/store';
import { IBrewery, IBeer } from '../shared/models';

export enum Types {
  SET_COLLECTION = '[BREWERY]_SET_COLLECTION',
  SET_SELECTED = '[BREWERY]_SET_SELECTED',
  SET_SELECTED_BREWERY_BEERS = '[BREWERY]_SET_SELECTED_BREWERY_BEERS'
}

export class SetCollection implements Action {
  readonly type = Types.SET_COLLECTION;

  constructor(public payload: IBrewery[]) {}
}

export class SetSelected implements Action {
  readonly type = Types.SET_SELECTED;

  constructor(public payload: IBrewery) {}
}

export class SetSelectedBreweryBeers implements Action {
  readonly type = Types.SET_SELECTED_BREWERY_BEERS;

  constructor(public payload: IBeer[]) {}
}

export type Actions = SetCollection
  | SetSelected
  | SetSelectedBreweryBeers;
