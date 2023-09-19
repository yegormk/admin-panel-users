import { UserProfileReducer } from 'src/app/user/components/user-profile/state/reducer';
import { UserEducationReducer } from 'src/app/user/components/user-profile/user-education/state/reducer';

export const userReducersMap = {
  user: UserProfileReducer,
  'user-education': UserEducationReducer,
};
