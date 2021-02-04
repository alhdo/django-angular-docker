import {createAction, props} from '@ngrx/store';

export const login = createAction('[Login Page] Login',
  props<{user: object, accessToken: string, refresh: string}>()
);

export const authInit = createAction('[Init] Auth Init',
  props<{user: object, accessToken: string, refresh: string}>()
);


export const logout = createAction('[Header] Logout',
  // @ts-ignore
  props<{}>()
);

export const update = createAction('[Update User] Update',
  props<{user: object}>()
);
