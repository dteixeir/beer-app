import { Action } from '@ngrx/store';
import { IBrewery } from './brewery.model';

export enum BreweryActionTypes {
  SET_BREWERIES = '[BREWERY]_SET_BREWERIES'
}

export class SetBreweries implements Action {
  readonly type = BreweryActionTypes.SET_BREWERIES;

  constructor(public payload: IBrewery[]) {}
}

export type BreweryActions = SetBreweries;
