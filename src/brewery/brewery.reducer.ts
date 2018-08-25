import { BreweryActions, BreweryActionTypes } from './brewery.actions';
import { IBrewery } from './brewery.model';
import * as fromRoot from '../app/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// define new partial store
export interface BreweryState {
  breweries: IBrewery[];
}

// extend store
export interface State extends fromRoot.State {
  breweries: BreweryState;
}

// initial state
const initialState: BreweryState = {
  breweries: []
};

// reducer
export function breweryReducer(state: State | BreweryState = initialState, action: BreweryActions) {
  switch (action.type) {
    case BreweryActionTypes.SET_BREWERIES:
      return {
        ...state,
        breweries: action.payload
      };

    default:
      return {
        ...state
      };
  }
}

export const getBreweryState = createFeatureSelector<BreweryState>('brewery');

export const getBreweries = createSelector(getBreweryState, (state: BreweryState) => state.breweries);
