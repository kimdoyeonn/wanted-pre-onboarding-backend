import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne', () => {
    it('company 하나 조회하기', () => {
      service.create({
        name: 'Test Company',
        nation: '한국',
        city: '서울',
        userId: 1,
      });
    });
  });

  // describe('생성하기', () => {
  //   it('company 생성하기', () => {
  //     const beforeCreate = service.getAll();
  //   });
  // });
});
