import { BeerActions, BeerActionTypes } from './beer.actions';
import { IBeer } from './beer.model';
import * as fromRoot from '../app/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// define new partial store
export interface BeerState {
  beers: IBeer[];
}

// extend store
export interface State extends fromRoot.State {
  beers: BeerState;
}

// initial state
const initialState: BeerState = {
  beers: []
};

// reducer
export function beerReducer(state: State | BeerState = initialState, action: BeerActions) {
  switch (action.type) {
    case BeerActionTypes.SET_BREWERIES:
      return {
        ...state,
        beers: action.payload
      };

    default:
      return {
        ...state
      };
  }
}

export const getBeerState = createFeatureSelector<BeerState>('beer');

export const getBeers = createSelector(getBeerState, (state: BeerState) => state.beers);
