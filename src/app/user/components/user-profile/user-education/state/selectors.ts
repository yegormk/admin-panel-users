import { createSelector } from '@ngrx/store';

import {
  IUserProfileFeatureState,
  selectUserProfileFeature,
} from 'src/app/user/components/user-profile/state/selectors';

export const selectUserEducation = createSelector(
  selectUserProfileFeature,
  (state: IUserProfileFeatureState) => state['user-education'],
);
