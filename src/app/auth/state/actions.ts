import { createAction, props } from '@ngrx/store';

import { IAuthCredentials } from 'src/app/auth/models/credentials';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: IAuthCredentials }>(),
);
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFail = createAction('[Auth] Login Fail');

export const register = createAction(
  '[Auth] Register',
  props<{ credentials: IAuthCredentials }>(),
);
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFail = createAction('[Auth] Register Fail');

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFail = createAction('[Auth] Logout Fail');
