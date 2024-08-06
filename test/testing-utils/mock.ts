import { Repository } from 'typeorm';

export const mockRepository = () => ({
  find: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
  }),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    getOne: jest.fn(),
  }),
  delete: jest.fn(),
  findBy: jest.fn(),
});

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
