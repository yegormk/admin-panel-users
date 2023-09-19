import { ISiteNavigationLink } from 'src/app/navigation/models/site-navigation-link';
import { SiteNavigationLinkNames } from 'src/app/navigation/models/site-navigation-links-names';
import { UserRoles } from 'src/app/shared/constants/user-roles';

export const siteNavigationLinksData: ISiteNavigationLink[] = [
  {
    path: ['/dashboard', 'home'],
    iconName: 'home',
    name: SiteNavigationLinkNames.home,
  },
  {
    path: ['/dashboard', 'user'],
    iconName: 'person',
    name: SiteNavigationLinkNames.currentUser,
  },
  {
    path: ['/dashboard', 'project'],
    iconName: 'dashboard',
    name: SiteNavigationLinkNames.projects,
  },
  {
    path: ['/dashboard', 'user', 'all'],
    iconName: 'people',
    name: SiteNavigationLinkNames.allUsers,
    // in prod mode all users route will be only available to UserRole.Admin
    restrictedAccessRoles: [UserRoles.Guest],
  },
];
