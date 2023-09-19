import { IUserOrProjectAttachment } from 'src/app/shared/interfaces/attachments-details';
import { IClientDetailsData } from 'src/app/shared/interfaces/client-details';
import { ITechnology } from 'src/app/shared/interfaces/technology';
import { IUserDetails } from 'src/app/shared/interfaces/user-details';
import { IUserWorkHistory } from 'src/app/shared/interfaces/user-work-history';

export interface IProjectDetailsData {
  id: number;
  name: string;
  description: string;
  technologies: ITechnology[];
  teamSize: string;
  ourCompanyResponsibility: string;
  pricingModel: string;
  averageHoursPerMonth: number;
  hourlyRate: number;
  fixedPrice: number;
  mainParticipant: IUserDetails[];
  secondaryParticipants: IUserDetails[];
  startDate: Date;
  endDate: Date;
  endReason: string;
  status: string;
  client: IClientDetailsData;
  projectDeploymentStatus: string;
  projectLink: string;
  demoCredentialsLogin: string;
  demoCredentialsPassword: string;
  createdAt: string;
  updatedAt: string;
  attachedAttachments: IUserOrProjectAttachment[] | null[];
  workHistories: IUserWorkHistory[];
}
