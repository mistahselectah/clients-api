import { AuthModule } from "@modules/auth/auth.module";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@modules/clients/clients.module';
import { RBAcModule } from 'nestjs-rbac';
import config from "../../config/app.config";
import { RBAC } from '../../rbac/settings';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => configService.get('db'),
    }),
    RBAcModule.forRoot(RBAC),
    AuthModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
