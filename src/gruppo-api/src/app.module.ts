import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entities/user.entity';
import { join } from 'path';
// import { GroupEntity } from './groups/entities/group.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      logging: true,
      synchronize: true,
      url: new ConfigService().get('DATABASE_URL'),
      entities: [UserEntity],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
