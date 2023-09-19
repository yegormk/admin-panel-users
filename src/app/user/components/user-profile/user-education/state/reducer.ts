import { createReducer, on } from '@ngrx/store';

import { IUserEducationDetails } from 'src/app/shared/interfaces/user-education';
import { userProfileActions } from 'src/app/user/components/user-profile/state/actions';
import { userEducationActions } from 'src/app/user/components/user-profile/user-education/state/actions';

const initialState: IUserEducationDetails[] = [];

export const UserEducationReducer = createReducer(
  initialState,

  on(userProfileActions.loadedUser, (_, { user }) => user.educationInfo),

  on(
    userEducationActions.addedUserEducationItem,
    (state, { educationItem }) => [educationItem, ...state],
  ),

  on(userEducationActions.removedEducationItem, (state, { id }) =>
    state.filter((item) => item.id !== id),
  ),

  on(
    userEducationActions.updatedUserEducationItem,
    (state, { educationItem }) =>
      state.map((item) => {
        if (item.id === educationItem.id) {
          return educationItem;
        }
        return item;
      }),
  ),
);
