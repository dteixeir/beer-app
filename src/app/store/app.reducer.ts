import * as fromUI from '@shared/ui';
import * as fromAuth from '@fromAuth';
import * as fromUser from '@fromUser';

import { ActionReducerMap } from '@ngrx/store';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.reducer,
  auth: fromAuth.reducer,
  user: fromUser.reducer
};

