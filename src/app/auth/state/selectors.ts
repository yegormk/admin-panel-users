import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from 'src/app/auth/state/reducer';

const selectAuthFeature = createFeatureSelector<IAuthState>('auth');

export const selectRequestingStatus = createSelector(
  selectAuthFeature,
  (state: IAuthState) => state.isRequesting,
);
