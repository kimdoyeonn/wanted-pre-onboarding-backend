import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingsService } from './job-postings.service';
import { JobPosting } from '../entities/job-posting.entity';
import { MockRepository, mockRepository } from '../../test/testing-utils/mock';
import { NotFoundException } from '@nestjs/common';
import { JobPostingsRepository } from './job-postings.repository';
import { CompaniesService } from '../companies/companies.service';
import { CompaniesRepository } from '../companies/companies.repository';
import { ApplicationRepository } from '../applications/application.repository';
import { Company } from 'src/entities/company.entity';
import { JobPostingFacade } from './job-postings.facade';
import { ApplicationsService } from 'src/applications/application.service';

describe('JobPostingsService', () => {
  let jobPostingFacade: JobPostingFacade;
  let jobPostingsService: JobPostingsService;
  let jobPostingRepository: MockRepository<JobPosting>;
  let companiesRepository: MockRepository<Company>;
  let companiesService: CompaniesService;
  let applicationsService: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        JobPostingFacade,
        JobPostingsService,
        {
          provide: JobPostingsRepository,
          useValue: mockRepository(),
        },
        {
          provide: CompaniesRepository,
          useValue: mockRepository(),
        },
        {
          provide: ApplicationRepository,
          useValue: mockRepository(),
        },
        CompaniesService,
        ApplicationsService,
      ],
    }).compile();

    jobPostingRepository = module.get<MockRepository<JobPosting>>(
      JobPostingsRepository,
    );
    companiesRepository =
      module.get<MockRepository<Company>>(CompaniesRepository);
    jobPostingFacade = module.get<JobPostingFacade>(JobPostingFacade);
    jobPostingsService = module.get<JobPostingsService>(JobPostingsService);
    companiesService = module.get<CompaniesService>(CompaniesService);
    applicationsService = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(jobPostingFacade).toBeDefined();
    expect(jobPostingRepository).toBeDefined();
    expect(companiesService).toBeDefined();
    expect(companiesRepository).toBeDefined();
    expect(applicationsService).toBeDefined();
  });

  describe('getByCompanyId', () => {
    it('company_id에 해당하는 job posting들을 반환', async () => {
      const companyId = 1;
      const jobPostings = [{ id: 1 }, { id: 2 }, { id: 3 }];

      const getByCompanyIdSpy = jest
        .spyOn(jobPostingRepository, 'find')
        .mockResolvedValue(jobPostings);

      const result = await jobPostingsService.getByCompanyId(companyId);

      expect(getByCompanyIdSpy).toHaveBeenCalledTimes(1);
      expect(getByCompanyIdSpy).toHaveBeenCalledWith({
        select: { id: true },
        where: { company: { id: companyId } },
      });
      expect(result).toEqual(jobPostings);
    });
  });

  describe('getOneWithCompanyById', () => {
    it('id에 해당하는 jobPosting 객체을 반환', async () => {
      const jobPostingId = 3;

      const jobPosting = {
        id: 3,
        position: 'test position',
        reward: 2000000,
        stack: 'react',
        description:
          'description description description description description',
        createdAt: new Date(),
        updatedAt: new Date(),
        company: {
          id: 1,
          name: 'Test Company',
          nation: 'Korea',
          city: 'Seoul',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      const getOneWithCompanyByIdSpy = jest
        .spyOn(jobPostingRepository, 'findOne')
        .mockReturnValue(jobPosting);

      const result =
        await jobPostingsService.getOneWithCompanyById(jobPostingId);

      expect(getOneWithCompanyByIdSpy).toHaveBeenCalledTimes(1);
      expect(getOneWithCompanyByIdSpy).toHaveBeenCalledWith({
        relations: { company: true },
        where: { id: jobPostingId },
      });
      expect(result).toEqual(jobPosting);
    });

    it('id에 해당하는 jobPosting이 존재하지 않으면 에러 반환', async () => {
      const jobPostingId = 3;

      const getOneWithCompanyByIdSpy = jest
        .spyOn(jobPostingRepository, 'findOne')
        .mockReturnValue(null);

      try {
        await jobPostingsService.getOneWithCompanyById(jobPostingId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBeDefined();

        expect(getOneWithCompanyByIdSpy).toHaveBeenCalledTimes(1);
        expect(getOneWithCompanyByIdSpy).toHaveBeenCalledWith({
          relations: { company: true },
          where: { id: jobPostingId },
        });
      }
    });
  });

  describe('getAll', () => {
    it('모든 JobPosting객체를 반환', async () => {
      const jobPostings = [
        {
          id: 3,
          position: 'test position',
          reward: 2000000,
          stack: 'react',
          description:
            'description description description description description',
          createdAt: new Date(),
          updatedAt: new Date(),
          company: {
            id: 1,
            name: 'Test Company',
            nation: 'Korea',
            city: 'Seoul',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: 4,
          position: 'test position',
          reward: 2000000,
          stack: 'react',
          description:
            'description description description description description',
          createdAt: new Date(),
          updatedAt: new Date(),
          company: {
            id: 1,
            name: 'Test Company',
            nation: 'Korea',
            city: 'Seoul',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: 5,
          position: 'test position',
          reward: 2000000,
          stack: 'react',
          description:
            'description description description description description',
          createdAt: new Date(),
          updatedAt: new Date(),
          company: {
            id: 1,
            name: 'Test Company',
            nation: 'Korea',
            city: 'Seoul',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      const getAllJobPostingsSpy = jest
        .spyOn(jobPostingRepository, 'find')
        .mockResolvedValue(jobPostings);

      const result = await jobPostingsService.getAll();

      expect(getAllJobPostingsSpy).toHaveBeenCalledTimes(1);
      expect(getAllJobPostingsSpy).toHaveBeenCalledWith({
        relations: { company: true },
      });
      expect(result).toEqual(jobPostings);
    });
  });

  describe('create', () => {
    const createJobPostingDto = {
      position: '3 position 333',
      description:
        'description description description description description',
      stack: 'react',
      reward: 1000000,
      companyId: 3,
    };
    const newJobPosting = {
      position: '3 position 333',
      description:
        'description description description description description',
      stack: 'react',
      reward: 1000000,
      companyId: 3,
      id: 9,
      createdAt: new Date('2024-08-09T17:38:03.130Z'),
      updatedAt: new Date('2024-08-09T17:38:03.130Z'),
      company: {
        city: 'Seoul',
        createdAt: new Date('2024-08-09T17:38:03.130Z'),
        id: 3,
        name: 'test',
        nation: 'Korea',
        updatedAt: new Date('2024-08-09T17:38:03.130Z'),
        userId: 2,
      },
    };
    it('JobPosting 객체를 생성하여 반환', async () => {
      const findCompanySpy = jest
        .spyOn(companiesService, 'getOne')
        .mockResolvedValue({
          id: 3,
          name: 'test',
          nation: 'Korea',
          city: 'Seoul',
          userId: 2,
          createdAt: new Date('2024-08-09T17:38:03.130Z'),
          updatedAt: new Date('2024-08-09T17:38:03.130Z'),
        });

      const saveSpy = jest
        .spyOn(jobPostingsService, 'save')
        .mockResolvedValue(newJobPosting);

      const result = await jobPostingFacade.create(createJobPostingDto);

      expect(findCompanySpy).toHaveBeenCalledTimes(1);
      expect(findCompanySpy).toHaveBeenCalledWith(
        createJobPostingDto.companyId,
      );

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(createJobPostingDto);

      expect(result).toEqual(newJobPosting);
    });
    it('company가 존재하지 않을 경우 에러를 반환', async () => {
      jest.spyOn(companiesService, 'getOne').mockResolvedValue(null);
      jest.spyOn(jobPostingRepository, 'save').mockResolvedValue(newJobPosting);

      try {
        await jobPostingFacade.create(createJobPostingDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBeDefined();
      }
    });
  });

  describe('update', () => {
    it('id에 대한 JobPosting를 수정하여 결과를 반환', async () => {
      const jobPostingId = 1;
      const jobPostingDto = {
        position: 'updated position',
        description: 'updated description',
        stack: 'Java',
        reward: 2000000,
      };
      const targetJobPosting = {
        position: '3 position 333',
        description:
          'description description description description description',
        stack: 'react',
        reward: 1000000,
        companyId: 3,
        id: 9,
        createdAt: new Date('2024-08-09T17:38:03.130Z'),
        updatedAt: new Date('2024-08-09T17:38:03.130Z'),
      };
      const updateResult = {
        position: 'updated position',
        description: 'updated description',
        stack: 'Java',
        reward: 2000000,
        companyId: 3,
        id: 9,
        createdAt: new Date('2024-08-09T17:38:03.130Z'),
        updatedAt: new Date('2024-08-09T17:38:03.130Z'),
      };

      const findOneSpy = jest
        .spyOn(jobPostingsService, 'getOne')
        .mockResolvedValue(targetJobPosting);

      const saveSpy = jest.spyOn(jobPostingsService, 'update');

      const result = await jobPostingFacade.update(jobPostingId, jobPostingDto);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(jobPostingId);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(jobPostingId, jobPostingDto);

      expect(result).toEqual(updateResult);
    });

    it('id에 대한 jobPosting이 존재하지 않으면 에러를 반환', async () => {
      const jobPostingId = 1;
      const jobPostingDto = null;

      const findOneSpy = jest
        .spyOn(jobPostingRepository, 'findOne')
        .mockResolvedValue(null);

      try {
        await jobPostingsService.update(jobPostingId, jobPostingDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBeDefined();

        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: jobPostingId },
        });
      }
    });
  });

  describe('delete', () => {
    it('id에 대한 jobPosting을 삭제하고 삭제한 개수를 반환', async () => {
      const jobPostingId = 2;
      const jobPosting = {
        position: '3 position 333',
        description:
          'description description description description description',
        stack: 'react',
        reward: 1000000,
        companyId: 3,
        id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const deleteResult = {
        affected: 1,
        raw: [],
      };

      const findOneSpy = jest
        .spyOn(jobPostingsService, 'getOne')
        .mockResolvedValue(jobPosting);

      const findApplicationSpy = jest
        .spyOn(applicationsService, 'getByJobPostingId')
        .mockResolvedValue([
          {
            id: 1,
            userId: 1,
            jobPostingId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);

      const deleteSpy = jest
        .spyOn(jobPostingsService, 'delete')
        .mockResolvedValue(deleteResult);

      const result = await jobPostingFacade.delete(jobPostingId);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(jobPostingId);

      expect(findApplicationSpy).toHaveBeenCalledTimes(1);
      expect(findApplicationSpy).toHaveBeenCalledWith(jobPosting.id);

      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(jobPostingId);

      expect(result).toEqual(deleteResult);
    });

    it('id에 대한 jobPosting이 존재하지 않으면 에러를 반환', async () => {
      const jobPostingId = 3;

      const findOneSpy = jest
        .spyOn(jobPostingRepository, 'findOne')
        .mockResolvedValue(null);

      try {
        await jobPostingsService.delete(jobPostingId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBeDefined();

        expect(findOneSpy).toHaveBeenCalledTimes(1);
        expect(findOneSpy).toHaveBeenCalledWith({
          where: { id: jobPostingId },
        });
      }
    });
  });
});
