import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingsController } from './job-postings.controller';
import { JobPostingsService } from './job-postings.service';

describe('JobPostingsController', () => {
  let jobPostingsController: JobPostingsController;
  let jobPostingsService: JobPostingsService;

  const mockJobPostingsService = {
    create: jest.fn(),
    update: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn(),
    getOneWithCompanyById: jest.fn(),
    getByCompanyId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostingsController],
      providers: [
        { provide: JobPostingsService, useValue: mockJobPostingsService },
      ],
    }).compile();

    jobPostingsController = module.get<JobPostingsController>(
      JobPostingsController,
    );
    jobPostingsService = module.get<JobPostingsService>(JobPostingsService);
  });

  it('should be defined', () => {
    expect(jobPostingsController).toBeDefined();
    expect(jobPostingsService).toBeDefined();
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
      const jobPostingDto = {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createSpy = jest
        .spyOn(jobPostingsService, 'create')
        .mockResolvedValue(newJobPosting);

      const response = await jobPostingsController.create(jobPostingDto);

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
        .spyOn(jobPostingsService, 'update')
        .mockResolvedValue(updateResult);

      const response = await jobPostingsController.update(
        jobPostingId,
        jobPostingDto,
      );

      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalledWith(jobPostingId, jobPostingDto);

      expect(response).toEqual(updateResult);
    });
  });
});
