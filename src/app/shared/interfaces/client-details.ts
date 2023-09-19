import { IProjectDetailsData } from 'src/app/shared/interfaces/project-details';

export interface IClientDetailsData {
  id: number;
  name: string;
  link: string;
  communicationType: string;
  projects: IProjectDetailsData[] | null[];
}
