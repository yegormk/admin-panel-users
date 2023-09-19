import { IUserOrProjectAttachment } from 'src/app/shared/interfaces/attachments-details';
import { IProjectDetailsData } from 'src/app/shared/interfaces/project-details';
import { IUserDetails } from 'src/app/shared/interfaces/user-details';

export interface IUserWorkHistory {
  id: number;
  project: IProjectDetailsData | string;
  user: IUserDetails | string;
  startDate: string;
  endDate: string;
  positionOnProject: string;
  responsibility: string;
  showCaseAttachments: IUserOrProjectAttachment[] | null[];
}
