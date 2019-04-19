import { Action } from '@ngrx/store';
import { IBeer } from '@fromBeer';
import { IBrewery } from './brewery.model';

export const SET_COLLECTION = '[BREWERY]_SET_COLLECTION';
export class SetCollection implements Action {
  readonly type = SET_COLLECTION;

  constructor(public payload: IBrewery[]) {}
}

export const SET_SELECTED = '[BREWERY]_SET_SELECTED';
export class SetSelected implements Action {
  readonly type = SET_SELECTED;

  constructor(public payload: IBrewery) {}
}

export const SET_SELECTED_BREWERY_BEERS = '[BREWERY]_SET_SELECTED_BREWERY_BEERS';
export class SetSelectedBreweryBeers implements Action {
  readonly type = SET_SELECTED_BREWERY_BEERS;

  constructor(public payload: IBeer[]) {}
}

export const SET_COLLECTION_PAGE = '[BREWERY]_SET_COLLECTION_PAGE';
export class SetCollectionPage implements Action {
  readonly type = SET_COLLECTION_PAGE;

  constructor(public payload: number) {}
}

export type Actions = SetCollection
  | SetSelected
  | SetSelectedBreweryBeers
  | SetCollectionPage;
