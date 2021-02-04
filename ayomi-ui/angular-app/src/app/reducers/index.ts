import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {loginReducer} from './login.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  auth: loginReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
