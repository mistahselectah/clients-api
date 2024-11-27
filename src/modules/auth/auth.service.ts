import { md5 } from '@common/functions';
import { ClientEntity } from '@entities/client.entity';
import { LoginInput } from '@modules/auth/dto/login.input';
import { LoginOutput } from '@modules/auth/dto/login.output';
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserIdentity } from '@common/interfaces';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(ClientEntity) private clientsRepo: typeof ClientEntity,
  ) {}

  async login(input: LoginInput): Promise<LoginOutput> {
    const user = await this.clientsRepo.findOneBy({ email: input.email });
    if (user?.password !== md5(input.password)) {
      throw new UnauthorizedException();
    }
    const { id, role } = user;
    return {
      token: this.jwtService.sign({ id, role }),
    };
  }

  async validateUser(userId: string): Promise<ClientEntity> {
    return await this.clientsRepo.findOneBy({ id: userId });
  }

  async verifyToken(token: string): Promise<IUserIdentity> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('api').salt,
      });
    } catch (error) {
       this.logger.error(error.message, error.stack);
       throw new UnauthorizedException();
    }
  }
}
