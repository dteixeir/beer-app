import { Action } from '@ngrx/store';
import { IBeer } from '@fromBeer';

export enum Types {
  SET_BEERS = '[BEER]_SET_COLLECTION',
  SET_SELECTED_BEER = '[BEER]_SET_SELECTED'
}

export class SetCollection implements Action {
  readonly type = Types.SET_BEERS;

  constructor(public payload: IBeer[]) {}
}

export class SetSelected implements Action {
  readonly type = Types.SET_SELECTED_BEER;

  constructor(public payload: IBeer) {}
}

export type Actions = SetCollection
  | SetSelected;

// export interface IActions {
//   SetCollection;
//   SetSelected;
// }
