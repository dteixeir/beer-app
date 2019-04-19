import * as BreweryActions from './brewery.actions';
import * as fromRoot from '../../app/app.reducer';
import { IBrewery } from './brewery.model';

// define new partial store
export interface BreweryState {
  breweries: IBrewery[];
  selectedBrewery: IBrewery;
  currentPage: number;
}

// extend store
export interface State extends fromRoot.State {
  breweries: BreweryState;
}

// initial state
const initialState: BreweryState = {
  breweries: [],
  selectedBrewery: null,
  currentPage: 0
};

// reducer
export function breweryReducer(state: BreweryState = initialState, action: BreweryActions.Actions) {
  switch (action.type) {
    case BreweryActions.SET_COLLECTION:
      return {
        ...state,
        breweries: action.payload
      };

    case BreweryActions.SET_SELECTED:
      return {
        ...state,
        selectedBrewery: action.payload
      };

    case BreweryActions.SET_SELECTED_BREWERY_BEERS:
      return {
        ...state,
        selectedBrewery: {
          ...state.selectedBrewery,
          beers: action.payload
        }
      };

    case BreweryActions.SET_COLLECTION_PAGE:
      return {
        ...state
        , currentPage: action.payload
      }

    default:
      return { ...state };
  }
}
