import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingsController } from './job-postings.controller';
import { JobPostingsService } from './job-postings.service';
import { JobPostingFacade } from './job-postings.facade';
import { CompaniesService } from 'src/companies/companies.service';
import { ApplicationsService } from 'src/applications/application.service';

describe('JobPostingsController', () => {
  let jobPostingsController: JobPostingsController;
  let jobPostingsService: JobPostingsService;
  let jobPostingFacade: JobPostingFacade;
  let applicationsService: ApplicationsService;

  const mockJobPostingsService = {
    create: jest.fn(),
    update: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn(),
    getOneWithCompanyById: jest.fn(),
    getByCompanyId: jest.fn(),
    delete: jest.fn(),
  };

  const mockCompaniesService = {
    getOne: jest.fn(),
    getByUserId: jest.fn(),
    create: jest.fn(),
  };

  const mockApplicationsService = {
    getByJobPostingId: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
    getApplication: jest.fn(),
    checkExistingApplication: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostingsController],
      providers: [
        { provide: JobPostingsService, useValue: mockJobPostingsService },
        JobPostingFacade,
        { provide: CompaniesService, useValue: mockCompaniesService },
        { provide: ApplicationsService, useValue: mockApplicationsService },
      ],
    }).compile();

    jobPostingsController = module.get<JobPostingsController>(
      JobPostingsController,
    );
    jobPostingsService = module.get<JobPostingsService>(JobPostingsService);
    jobPostingFacade = module.get<JobPostingFacade>(JobPostingFacade);
    applicationsService = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(jobPostingsController).toBeDefined();
    expect(jobPostingsService).toBeDefined();
    expect(jobPostingFacade).toBeDefined();
    expect(applicationsService).toBeDefined();
  });

  describe('getAll', () => {
    it('모든 채용공고를 조회', async () => {
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
          companyId: 1,
          company: {
            id: 1,
            name: 'Test Company',
            nation: 'Korea',
            city: 'Seoul',
            userId: 3,
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
          companyId: 1,
          company: {
            id: 1,
            name: 'Test Company',
            nation: 'Korea',
            city: 'Seoul',
            userId: 3,
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
          companyId: 1,
          company: {
            id: 1,
            name: 'Test Company',
            nation: 'Korea',
            city: 'Seoul',
            userId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      const getAllSpy = jest
        .spyOn(jobPostingsService, 'getAll')
        .mockResolvedValue(jobPostings);

      const response = await jobPostingsController.getAll();

      expect(getAllSpy).toHaveBeenCalled();
      response.forEach((jp) => {
        expect(jp).toMatchObject({
          id: expect.any(Number),
          companyName: expect.any(String),
          nation: expect.any(String),
          city: expect.any(String),
          position: expect.any(String),
          reward: expect.any(Number),
          stack: expect.any(String),
        });
      });
    });
  });

  describe('create', () => {
    it('jobPosting을 생성', async () => {
      const createJobPostingDto = {
        position: '3 position 333',
        description:
          'description description description description description',
        stack: 'react',
        reward: 1000000,
        companyId: 3,
      };

      const newJobPosting = {
        id: 9,
        companyName: 'company test',
        nation: 'korea',
        city: 'seoul',
        position: '3 position 333',
        reward: 1000000,
        description:
          'description description description description description',
        stack: 'react',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createSpy = jest
        .spyOn(jobPostingFacade, 'create')
        .mockResolvedValue(newJobPosting);

      const response = await jobPostingFacade.create(createJobPostingDto);

      expect(createSpy).toHaveBeenCalled();
      expect(response).toEqual(newJobPosting);
    });
  });

  describe('getOne', () => {
    it('id에 대한 jobPosting 객체를 반환', async () => {
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
        companyId: 1,
        company: {
          id: 1,
          name: 'Test Company',
          nation: 'Korea',
          city: 'Seoul',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      const getOneWithCompanyByIdSpy = jest
        .spyOn(jobPostingsService, 'getOneWithCompanyById')
        .mockResolvedValue(jobPosting);

      const getByCompanyIdSpy = jest
        .spyOn(jobPostingsService, 'getByCompanyId')
        .mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const response = await jobPostingsController.getOne(jobPostingId);

      expect(getOneWithCompanyByIdSpy).toHaveBeenCalledTimes(1);
      expect(getOneWithCompanyByIdSpy).toHaveBeenCalledWith(jobPostingId);

      expect(getByCompanyIdSpy).toHaveBeenCalledTimes(1);
      expect(getByCompanyIdSpy).toHaveBeenCalledWith(jobPosting.companyId);

      expect(response).toMatchObject({
        id: expect.any(Number),
        companyName: expect.any(String),
        nation: expect.any(String),
        city: expect.any(String),
        position: expect.any(String),
        reward: expect.any(Number),
        stack: expect.any(String),
        description: expect.any(String),
        otherJobPostings: expect.any(Array),
      });
    });
  });

  describe('update', () => {
    it('jobPosting을 업데이트하여 결과를 반환', async () => {
      const jobPostingId = 1;
      const jobPostingDto = {
        position: 'updated position',
        description: 'updated description',
        stack: 'Java',
        reward: 2000000,
      };

      const updateResult = {
        position: 'updated position',
        description: 'updated description',
        stack: 'Java',
        reward: 2000000,
        companyId: 3,
        id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateSpy = jest
        .spyOn(jobPostingFacade, 'update')
        .mockResolvedValue(updateResult);

      const response = await jobPostingFacade.update(
        jobPostingId,
        jobPostingDto,
      );

      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(jobPostingId, jobPostingDto);

      expect(response).toEqual(updateResult);
    });
  });

  describe('delete', () => {
    it('id에 대한 jobPosting을 삭제하고 아무것도 반환하지 않음', async () => {
      const jobPostingId = 2;

      const existingJobPosting = {
        position: 'position',
        description: 'description',
        stack: 'Java',
        reward: 2000000,
        companyId: 3,
        id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const getOneSpy = jest
        .spyOn(jobPostingsService, 'getOne')
        .mockResolvedValue(existingJobPosting);

      const getApplicationByJobPostingId = jest
        .spyOn(applicationsService, 'getByJobPostingId')
        .mockResolvedValue([
          {
            id: 1,
            userId: 2,
            jobPostingId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);

      const deleteSpy = jest.spyOn(jobPostingsService, 'delete');

      const response = await jobPostingFacade.delete(jobPostingId);

      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(getOneSpy).toHaveBeenCalledWith(jobPostingId);

      expect(getApplicationByJobPostingId).toHaveBeenCalledTimes(1);
      expect(getApplicationByJobPostingId).toHaveBeenCalledWith(
        existingJobPosting.id,
      );

      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalledWith(jobPostingId);

      expect(response).toBeUndefined();
    });
  });
});
