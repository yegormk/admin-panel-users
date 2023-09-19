import { createReducer, on } from '@ngrx/store';

import * as AuthActions from 'src/app/auth/state/actions';

export interface IAuthState {
  isRequesting: boolean;
}

const initialState: IAuthState = {
  isRequesting: false,
};

export const AuthReducer = createReducer(
  initialState,

  on(AuthActions.login, AuthActions.register, AuthActions.logout, (state) => ({
    ...state,
    isRequesting: true,
  })),

  on(
    AuthActions.loginSuccess,
    AuthActions.loginFail,
    AuthActions.registerSuccess,
    AuthActions.registerFail,
    AuthActions.logoutSuccess,
    AuthActions.logoutFail,
    (state) => ({
      ...state,
      isRequesting: false,
    }),
  ),
);
