import * as BreweryActions from './brewery.actions';
import { IBrewery } from '../shared/models';
import * as fromRoot from '../app/app.reducer';

// define new partial store
export interface BreweryState {
  breweries: IBrewery[];
  selectedBrewery: IBrewery;
}

// extend store
export interface State extends fromRoot.State {
  breweries: BreweryState;
}

// initial state
const initialState: BreweryState = {
  breweries: [],
  selectedBrewery: null
};

// reducer
export function breweryReducer(state: BreweryState = initialState, action: BreweryActions.Actions ) {
  switch (action.type) {
    case BreweryActions.Types.SET_COLLECTION:
      return {
        ...state,
        breweries: action.payload
      };

    case BreweryActions.Types.SET_SELECTED:
      return {
        ...state,
        selectedBrewery: action.payload
      };

    case BreweryActions.Types.SET_SELECTED_BREWERY_BEERS:
      return {
        ...state,
        selectedBrewery: {
          ...state.selectedBrewery,
          beers: action.payload
        }
      };

    default:
      return {
        ...state
      };
  }
}
