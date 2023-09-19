interface IStatusData {
  icon: string;
  name: string;
  color: string;
}
export interface IStatusesData {
  archived?: IStatusData;
  unarchived?: IStatusData;
}
