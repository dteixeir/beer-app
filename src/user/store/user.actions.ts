import { Action } from '@ngrx/store';
import { IUser } from './user.interface';

export enum UserActionTypes {
  SET_USER = '[USER]_SET_USER',
  CREATE_USER_ACCOUNT = '[USER]_CREATE_USER_ACCOUNT'
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SET_USER;

  constructor(public payload: IUser) { }
}

export class CreateUserAccount implements Action {
  readonly type = UserActionTypes.CREATE_USER_ACCOUNT;

  constructor(public payload: IUser) { }
}

export type UserActions = SetUser
  | CreateUserAccount;
