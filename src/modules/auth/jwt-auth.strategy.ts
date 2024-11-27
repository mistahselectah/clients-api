import { IUserIdentity } from '@common/interfaces';
import { AuthService } from '@modules/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('api').salt,
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
