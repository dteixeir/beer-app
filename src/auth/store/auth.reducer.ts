import * as actions from './auth.actions';
import { Action } from '@ngrx/store';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

// selectors
export const getIsAuthenticated = (state: State) => state.isAuthenticated;

// reducer
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case actions.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };

    case actions.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };

    default:
      return { ...state };
  }
}
