import { SiteNavigationLinkNames } from 'src/app/navigation/models/site-navigation-links-names';
import { UserRoles } from 'src/app/shared/constants/user-roles';

export interface ISiteNavigationLink {
  path: string[];
  iconName: string;
  name: SiteNavigationLinkNames;
  restrictedAccessRoles?: UserRoles[];
  accessPermission?: boolean;
}
