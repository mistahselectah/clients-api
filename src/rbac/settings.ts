import { EAction, EResource, ERole } from '@common/enum';
import { IStorageRbac, RBAC_REQUEST_FILTER } from 'nestjs-rbac';
import { UpdateUserFilter } from './update-user-filter';

export const RBAC: IStorageRbac = {
  roles: [ERole.ADMIN, ERole.USER],
  permissions: {
    [EResource.CLIENTS]: [
      EAction.LIST,
      EAction.GET_TOTAL_AMOUNT,
      EAction.CREATE,
      EAction.UPDATE,
      EAction.DELETE,
      RBAC_REQUEST_FILTER,
    ],
  },
  grants: {
    [ERole.ADMIN]: [
      `&${ERole.USER}`,
      `${EResource.CLIENTS}@${EAction.LIST}`,
      `${EResource.CLIENTS}@${EAction.GET_TOTAL_AMOUNT}`,
      `${EResource.CLIENTS}@${EAction.UPDATE}`,
      `${EResource.CLIENTS}@${EAction.DELETE}`,
    ],
    [ERole.USER]: [
      `${EResource.CLIENTS}@${EAction.CREATE}`,
      `${EResource.CLIENTS}@${RBAC_REQUEST_FILTER}`,
    ],
  },
  filters: {
    [RBAC_REQUEST_FILTER]: UpdateUserFilter,
  },
};
