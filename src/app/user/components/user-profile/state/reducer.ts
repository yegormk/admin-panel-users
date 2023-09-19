import { createReducer, on } from '@ngrx/store';

import { IUserDetails } from 'src/app/shared/interfaces/user-details';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { userEducationActions } from 'src/app/user/components/user-profile/user-education/state/actions';

export interface IUserProfileState {
  user: IUserDetails | null;
  loading: boolean;
}

const initialState: IUserProfileState = {
  user: null,
  loading: false,
};

export const UserProfileReducer = createReducer(
  initialState,

  on(
    userProfileActions.loadUser,
    userProfileActions.updateUser,
    userProfileActions.updateUserTechnologies,
    userEducationActions.addUserEducationItem,
    userEducationActions.updateUserEducationItem,
    userEducationActions.removeEducationItem,
    (state) => ({
      ...state,
      loading: true,
    }),
  ),

  on(
    userProfileActions.loadedUser,
    userProfileActions.updatedUser,
    (_, { user }) => ({
      loading: false,
      user: user,
    }),
  ),
  on(
    userProfileActions.error,
    userEducationActions.addedUserEducationItem,
    userEducationActions.updatedUserEducationItem,
    userEducationActions.removedEducationItem,
    (state) => ({
      ...state,
      loading: false,
    }),
  ),

  on(
    userProfileActions.updatedUserTechnologies,
    (state, { updatedTechnologies }) => {
      if (state.user) {
        return {
          loading: false,
          user: { ...state.user, techStack: updatedTechnologies },
        };
      }
      return { ...state, loading: false };
    },
  ),
);
