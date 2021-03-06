import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[AUTH]_SET_AUTHENTICATED';
export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export const SET_UNAUTHENTICATED = '[AUTH]_SET_UNAUTHENTICATED';
export class SetUnAuthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions 
  = SetAuthenticated
  | SetUnAuthenticated;
