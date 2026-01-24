import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      find: () => Promise.resolve([]),
      findOne: (id: number) => Promise.resolve({ id, email: 'test@test.com', password: '12345656' } as User),
      remove: (id: number) => Promise.resolve({ id, email: 'test@test.com', password: '12345656' } as User),
      update: (id: number, attrs: Partial<User>) => Promise.resolve({ id, email: 'test@test.com', password: '12345656', ...attrs } as User),
    };
    fakeAuthService = {
      signup: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
      signin: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
