import { EClientsPermissions, ERole } from '@common/enum';
import { IStorageRbac } from 'nestjs-rbac';

export const BAD_REQUEST_ERROR = {
  message: 'Bad Request',
  statusCode: 400
}


export const FORBIDDEN_ERROR = {
  message: 'Forbidden resource',
  statusCode: 403
}


export const RBAC: IStorageRbac = {
  roles: [ERole.ADMIN, ERole.USER],
  permissions: {
    clients: [
      EClientsPermissions.LIST,
      EClientsPermissions.GET_TOTAL_AMOUNT,
      EClientsPermissions.CREATE,
      EClientsPermissions.UPDATE,
      EClientsPermissions.DELETE
    ],
  },
  grants: {
    [ERole.ADMIN]: ['clients'],
    [ERole.USER]: [`clients@${EClientsPermissions.CREATE}`, `clients@${EClientsPermissions.UPDATE}`],
  },
  filters: {
    // [RBAC_REQUEST_FILTER]: RequestFilter,
  },
};

/*export class RequestFilter implements IFilterPermission {

  can(params?: any[]): boolean {
    return params[0];
  }

}*/
