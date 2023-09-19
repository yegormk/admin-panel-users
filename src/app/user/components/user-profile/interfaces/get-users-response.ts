import { IUserDetails } from 'src/app/shared/interfaces/user-details';

export interface IGetUsersResponse {
  data: IUserDetails[];
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
  };
}
