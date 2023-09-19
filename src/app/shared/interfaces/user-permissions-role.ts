export interface IUserPermissionsRole {
  id: number;
  value: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  UserRole: {
    id: number;
    roleId: number;
    userId: number;
  };
}
