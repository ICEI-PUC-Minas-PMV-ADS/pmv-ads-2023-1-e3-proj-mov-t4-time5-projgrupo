import { Module } from '@nestjs/common';
import { UsersService } from './services/group.service';
import { UsersController } from './controllers/group.controller';
import { UserEntity } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
