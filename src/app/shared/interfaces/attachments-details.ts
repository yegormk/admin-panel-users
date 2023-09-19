import { IProjectDetailsData } from './project-details';
import { IUserDetails } from './user-details';

export interface IUserOrProjectAttachment {
  id: number;
  comment: null | string;
  fileId: number;
  file: IUserAttachmentFile;
  publisherId: number;
  publisher: IUserDetails;
  userId: number;
  user: IUserDetails;
  projectId: number;
  project: IProjectDetailsData;
}

export interface IUserAttachmentFile {
  id: number;
  originalName: string;
  fileUrl: string;
  mimetype: string;
  publicId: string;
}
