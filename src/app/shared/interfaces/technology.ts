import { IProjectDetailsData } from 'src/app/shared/interfaces/project-details';
import { IUserDetails } from 'src/app/shared/interfaces/user-details';

export interface ITechnology {
  id: number;
  title: string;
  description?: string;
  officialDocsHref?: string;
  icon?: string;
  projects?: IProjectDetailsData[] | null[];
  users?: IUserDetails[];
}
