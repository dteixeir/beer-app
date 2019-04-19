import * as BeerActions from './beer.actions';

import { IBeer } from '@fromBeer';
import * as fromRoot from '../../app/app.reducer';

// define new partial store
export interface BeerState {
  beers: IBeer[];
  selectedBeer: IBeer;
}

// extend store
export interface State extends fromRoot.State {
  beers: BeerState;
}

// initial state
const initialState: BeerState = {
  beers: [],
  selectedBeer: null
};

// reducer
export function beerReducer(state: State | BeerState = initialState, action: BeerActions.Actions) {
  switch (action.type) {
    case BeerActions.Types.SET_BEERS:
      return {
        ...state,
        beers: action.payload
      };

    case BeerActions.Types.SET_SELECTED_BEER:
      return {
        ...state,
        selectedBeer: action.payload
      };

    default:
      return {
        ...state
      };
  }
}
