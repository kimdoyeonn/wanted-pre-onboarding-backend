import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MockRepository, mockRepository } from '../testing-utils/mock';
import { User } from '../entities/user.entity';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockRepository() },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('getOne', () => {
    it('id에 대한 User를 조회하여 객체를 반환합니다.', async () => {
      const userId = 1;

      const mockUser = {
        id: userId,
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const getOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockUser);

      const result = await usersService.getOne(userId);

      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(getOneSpy).toHaveBeenCalledWith({ where: { id: userId } });

      expect(result).toEqual(mockUser);
    });
  });
});
