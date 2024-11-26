import { ClientEntity } from '@entities/client.entity';
import { JwtStrategy } from '@modules/auth/jwt-auth.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { get } from 'env-var';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        secret: get('SALT').required().asString(),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
