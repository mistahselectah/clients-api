import { IFilterPermission } from 'nestjs-rbac';

export interface IExceptionResponse {
  message: string | string[];
  statusCode: number;
}

export interface IUserIdentity {
  id: string;
  role: string;
}

export interface IStorageRbac {
  roles: string[];
  permissions: object;
  grants: object;
  filters: { [key: string]: any | IFilterPermission };
}
