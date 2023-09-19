import { createReducer, on } from '@ngrx/store';

import { IUserPermissionsRole } from 'src/app/shared/interfaces/user-permissions-role';
import { mainUserActions } from 'src/app/user/state/actions';

// so far the current user object in global state only contains user id and roles
// if need it will be expanded
export interface ICurrentUserStoreData {
  id: number;
  roles: IUserPermissionsRole[];
  name: string;
  avatarUrl: string;
}

export interface IMainState {
  user: ICurrentUserStoreData | null;
}

const initialState: IMainState = {
  user: null,
};

export const MainUserReducer = createReducer(
  initialState,

  on(mainUserActions.loadedCurrentUser, (state, { user }) => ({
    ...state,
    user: user,
  })),
);
