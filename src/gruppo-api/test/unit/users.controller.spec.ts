import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/controllers/users.controller';
import { UsersService } from '../../src/users/services/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
