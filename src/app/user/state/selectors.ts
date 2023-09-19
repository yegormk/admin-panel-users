import { createFeatureSelector, createSelector } from '@ngrx/store';

import { siteNavigationLinksData } from 'src/app/navigation/constants/site-navigation-links-data';
import { ISiteNavigationLink } from 'src/app/navigation/models/site-navigation-link';
import { SiteNavigationLinkNames } from 'src/app/navigation/models/site-navigation-links-names';
import { UserRoles } from 'src/app/shared/constants/user-roles';
import { IMainState } from 'src/app/user/state/reducer';

export const selectUserFeature = createFeatureSelector<IMainState>('main');

export const selectCurrentUser = createSelector(
  selectUserFeature,
  (state: IMainState) => state.user,
);

export const selectCurrentUserName = createSelector(
  selectUserFeature,
  (state: IMainState) => state.user?.name,
);

export const selectCurrentUserAvatar = createSelector(
  selectUserFeature,
  (state: IMainState) => state.user?.avatarUrl,
);

export const selectSiteNavigationLinksDataByUserRole = createSelector(
  selectUserFeature,
  (state: IMainState): ISiteNavigationLink[] => {
    if (state.user) {
      const id = state.user.id;
      const userRoles = state.user.roles.map((role) => role.value as UserRoles);
      return siteNavigationLinksData.map((link) => {
        if (
          link.name === SiteNavigationLinkNames.currentUser &&
          !link.path.includes(id.toString())
        ) {
          link.path.push(id.toString());
        }
        if (link.restrictedAccessRoles) {
          const accessPermission = link.restrictedAccessRoles.some((role) =>
            userRoles?.includes(role),
          );
          return { ...link, accessPermission };
        }
        return { ...link, accessPermission: true };
      });
    } else {
      return [];
    }
  },
);

export const selectUserHasRole = createSelector(
  selectUserFeature,
  (state: IMainState, props: string) => {
    return state.user?.roles?.some((role) => role.value === props) || false;
  },
);
