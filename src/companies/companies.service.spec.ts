import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { MockRepository, mockRepository } from '../../test/testing-utils/mock';
import { Company } from '../entities/company.entity';
import { CompaniesRepository } from './companies.repository';

describe('CompaniesService', () => {
  let companiesService: CompaniesService;
  let companyRepository: MockRepository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        { provide: CompaniesRepository, useValue: mockRepository() },
      ],
    }).compile();

    companiesService = module.get<CompaniesService>(CompaniesService);
    companyRepository =
      module.get<MockRepository<Company>>(CompaniesRepository);
  });

  it('should be defined', () => {
    expect(companiesService).toBeDefined();
    expect(companyRepository).toBeDefined();
  });

  describe('getOne', () => {
    it('company 하나 조회하기', async () => {
      const companyId = 1;

      const mockCompany = {
        id: 1,
        name: 'test company',
        nation: 'Korea',
        city: 'Seoul',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const findOneBySpy = jest
        .spyOn(companyRepository, 'findOneBy')
        .mockResolvedValue(mockCompany);

      const result = await companiesService.getOne(companyId);

      expect(findOneBySpy).toHaveBeenCalledTimes(1);
      expect(findOneBySpy).toHaveBeenCalledWith({ id: companyId });

      expect(result).toEqual(mockCompany);
    });
  });

  describe('getByUserId', () => {
    it('userId로 company 조회하여 반환하기', async () => {
      const userId = 2;

      const mockCompany = {
        id: 1,
        name: 'test company',
        nation: 'Korea',
        city: 'Seoul',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const findOneBySpy = jest
        .spyOn(companyRepository, 'findOneBy')
        .mockResolvedValue(mockCompany);

      const result = await companiesService.getByUserId(userId);

      expect(findOneBySpy).toHaveBeenCalledTimes(1);
      expect(findOneBySpy).toHaveBeenCalledWith({ userId });

      expect(result).toEqual(mockCompany);
    });
  });

  describe('create', () => {
    it('새로운 Company 데이터를 생성하여 반환', async () => {
      const createCompanyDto = {
        name: 'new Company',
        nation: 'Korea',
        city: 'Seoul',
        userId: 2,
      };

      const mockCompany = {
        id: 1,
        name: 'test company',
        nation: 'Korea',
        city: 'Seoul',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const getByUserIdSpy = jest
        .spyOn(companiesService, 'getByUserId')
        .mockResolvedValue(null);
      const saveSpy = jest
        .spyOn(companyRepository, 'save')
        .mockResolvedValue(mockCompany);

      const result = await companiesService.create(createCompanyDto);

      expect(getByUserIdSpy).toHaveBeenCalledTimes(1);
      expect(getByUserIdSpy).toHaveBeenCalledWith(createCompanyDto.userId);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(createCompanyDto);

      expect(result).toEqual(mockCompany);
    });
  });
});
