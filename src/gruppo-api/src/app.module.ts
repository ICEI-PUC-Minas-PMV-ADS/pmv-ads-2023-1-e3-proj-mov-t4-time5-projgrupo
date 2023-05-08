import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: new ConfigService().get('DATABASE_HOST'),
      port: new ConfigService().get('DATABASE_PORT'),
      username: new ConfigService().get('DATABASE_USER'),
      password: new ConfigService().get('DATABASE_PASSWORD'),
      database: new ConfigService().get('DATABASE_NAME'),
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
