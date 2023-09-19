import { IUserDetails } from 'src/app/shared/interfaces/user-details';

export interface ILoginResponseData {
  tokens: {
    accessToken: string;
  };
  user: IUserDetails;
}
