import { Action } from '@ngrx/store';
import { IBeer } from './beer.model';

export enum BeerActionTypes {
  SET_BREWERIES = '[BEER]_SET_BEERS'
}

export class SetBeers implements Action {
  readonly type = BeerActionTypes.SET_BREWERIES;

  constructor(public payload: IBeer[]) {}
}

export type BeerActions = SetBeers;
