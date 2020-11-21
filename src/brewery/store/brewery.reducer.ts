import { BaseCollection, defaultState } from '@shared/baseClasses';

import * as BreweryActions from './brewery.actions';
import * as fromRoot from '../../app/store/app.reducer';
import { IBrewery } from './brewery.model';

// define new partial store
export interface BreweryState extends BaseCollection<IBrewery> { }

// initial state
const initialState: BreweryState = defaultState;

// extend store
export interface State extends fromRoot.State {
  breweries: BreweryState;
}

// reducer
export function breweryReducer(state: BreweryState = initialState, action: BreweryActions.Actions) {
  switch (action.type) {
    case BreweryActions.SET_COLLECTION:
      return {
        ...state,
        collection: action.payload
      };

    case BreweryActions.SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      };

    case BreweryActions.SET_SELECTED_BREWERY_BEERS:
      return {
        ...state,
        selectedBrewery: {
          ...state.selected,
          beers: action.payload
        }
      };

    case BreweryActions.SET_COLLECTION_PAGE:
      return {
        ...state
        , currentPage: action.payload
      }

    case BreweryActions.INCREMENT_PAGE:
      return {
        ...state
        , currentPage: ++state.currentPage
      };

    case BreweryActions.DECREMENT_PAGE:
      return {
        ...state
        , currentPage: --state.currentPage
      };

    default:
      return { ...state };
  }
}
