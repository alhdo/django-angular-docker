import {Action, createReducer, on} from '@ngrx/store';
import {login, authInit, logout, update} from '../actions/login.actions';

export interface State {
  user: object | null;
  accessToken: string | null;
  refresh: string | null;
}

export const initialState: State = {
  user: null,
  accessToken: null,
  refresh: null,
};

export const loginReducer = createReducer(initialState,
  on(login, (state, { user, accessToken, refresh }) => ({
    user,
    accessToken,
    refresh
  })),
  on(authInit, (state, { user, accessToken, refresh }) => ({
    user,
    accessToken,
    refresh
  })),
  on(logout, (state, {}) => (initialState)),
  on(update, (state, { user }) => ({
    user,
    // @ts-ignore
    accessToken: state.accessToken,
  })),
);

// tslint:disable-next-line:typedef
export function reducer(state: State | undefined, action: Action) {

  return loginReducer(state, action);
}
