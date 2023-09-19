import { UserStatus } from 'src/app/shared/constants/user-status';

export interface IUserPersonalData {
  name: string;
  surname: string;
  status: UserStatus;
  avatarUrl: string;
  birthday: string;
  email: string;
  startDate: string;
  endDate: string;
  endReason: string;
  phone: string;
  isOnProject?: boolean;
}
