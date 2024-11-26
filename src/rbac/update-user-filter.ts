import { ERole } from '@common/enum';
import { IUserIdentity } from '@common/interfaces';
import { Request } from 'express';
import { IFilterPermission } from 'nestjs-rbac';

export class UpdateUserFilter implements IFilterPermission {
  can(params?: any[]): boolean {
    const request: Request = params[0];
    const user = request.user as IUserIdentity;
    // TODO Regex
    return user.role === ERole.ADMIN || request.url.includes(user.id);
  }
}
