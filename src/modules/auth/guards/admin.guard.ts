import { ERole } from '@common/enum';
import { IUserIdentity } from '@common/interfaces';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const identity: IUserIdentity = request.user;
    return identity && identity.role === ERole.ADMIN;
  }
}
