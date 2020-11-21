import { UserActions, UserActionTypes } from './user.actions';
import { IUser } from './user.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  user: IUser;
}

const initialState: State = {
  user: null
};

export const getUserState = createFeatureSelector<State>('user');
export const getUser = createSelector(getUserState, (state) => state.user);
export const getHasUser = createSelector(getUserState, (state) => {
  return !(!!state.user && !!state.user.userId && state.user.userId !== null );
});

export function reducer(state: State = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.SET_USER:
    case UserActionTypes.CREATE_USER_ACCOUNT:
      return {
        ...state,
        user: { ...action.payload }
      };

    default:
      return { ...state };
  }
}
