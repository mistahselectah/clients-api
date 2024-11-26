import { md5 } from '@common/functions';
import { ClientEntity } from '@entities/client.entity';
import { LoginInput } from '@modules/auth/dto/login.input';
import { LoginOutput } from '@modules/auth/dto/login.output';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'env-var';
import { IUserIdentity } from '@common/interfaces';


@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService,
              @InjectRepository(ClientEntity) private clientsRepo: typeof ClientEntity) {
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    const user = await this.clientsRepo.findOneBy({ email: input.email });
    if (user?.password !== md5(input.password)) {
      throw new UnauthorizedException();
    }
    const { id, role } = user;
    const token = this.jwtService.sign({ id, role });

    return {
      role,
      token
    }
  }

  async validateUser(userId: string): Promise<ClientEntity> {
    return await this.clientsRepo.findOneBy({ id: userId });
  }

  async verifyToken(token: string): Promise<IUserIdentity> {
    return await this.jwtService.verifyAsync(
      token,
      {
        secret: get('SALT').required().asString()
      }
    );
  }
}
