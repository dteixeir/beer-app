import { UiActions, UiActionTypes } from './ui.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export const getUiState = createFeatureSelector<State>('ui');
export const getIsLoading = createSelector(getUiState, (state) => state.isLoading);

export function reducer(state: State = initialState, action: UiActions) {
  switch (action.type) {
    case UiActionTypes.START_LOADING:
      return { isLoading: true };

    case UiActionTypes.STOP_LOADING:
      return { isLoading: false };

    default:
      return { ...state };
  }
}
