import { IUserIdentity } from '@common/interfaces';
import { AuthService } from '@modules/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { get } from 'env-var';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: get('SALT').required().asString(),
    });
  }

  async validate(identity: IUserIdentity): Promise<any> {
    const user = await this.authService.validateUser(identity.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
