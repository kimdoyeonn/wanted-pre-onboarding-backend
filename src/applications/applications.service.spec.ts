import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { Application } from '../entities/application.entity';
import { MockRepository, mockRepository } from '../../test/testing-utils/mock';
import { JobPostingsService } from '../job-postings/job-postings.service';
import { UsersService } from '../users/users.service';
import { JobPostingsRepository } from '../job-postings/job-postings.repository';
import { UsersRepository } from '../users/users.repository';
import { CompaniesService } from '../companies/companies.service';
import { CompaniesRepository } from '../companies/companies.repository';
import { ApplicationRepository } from './application.repository';

describe('ApplicationsService', () => {
  let applicationsService: ApplicationsService;
  let applicationRepository: MockRepository<Application>;
  let jobPostingsService: JobPostingsService;
  let usersService: UsersService;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: ApplicationRepository,
          useValue: mockRepository(),
        },
        JobPostingsService,
        UsersService,
        CompaniesService,
        {
          provide: JobPostingsRepository,
          useValue: mockRepository(),
        },
        {
          provide: UsersRepository,
          useValue: mockRepository(),
        },
        {
          provide: CompaniesRepository,
          useValue: mockRepository(),
        },
      ],
    }).compile();

    jobPostingsService = module.get<JobPostingsService>(JobPostingsService);
    usersService = module.get<UsersService>(UsersService);
    companiesService = module.get<CompaniesService>(CompaniesService);
    applicationsService = module.get<ApplicationsService>(ApplicationsService);
    applicationRepository = module.get(ApplicationRepository);
  });

  it('should be defined', () => {
    expect(applicationsService).toBeDefined();
    expect(applicationRepository).toBeDefined();
    expect(jobPostingsService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(companiesService).toBeDefined();
  });

  describe('apply', () => {
    it('application 테이블에 새로운 데이터를 추가합니다.', async () => {
      const userId = 1;
      const jobPostingId = 1;

      const newApplication = {
        id: 1,
        userId,
        jobPostingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockUser = {
        id: 1,
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockJobPosting = {
        id: 1,
        position: 'test',
        stack: 'Java',
        reward: 120000,
        companyId: 2,
        description: 'testttesttest',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const getUserSpy = jest
        .spyOn(usersService, 'getOne')
        .mockResolvedValue(mockUser);

      const getJobPostingSpy = jest
        .spyOn(jobPostingsService, 'getOne')
        .mockResolvedValue(mockJobPosting);

      const saveSpy = jest
        .spyOn(applicationRepository, 'save')
        .mockResolvedValue(newApplication);

      const result = await applicationsService.apply({ userId, jobPostingId });

      expect(getUserSpy).toHaveBeenCalledTimes(1);
      expect(getUserSpy).toHaveBeenCalledWith(userId);
      expect(getJobPostingSpy).toHaveBeenCalledTimes(1);
      expect(getJobPostingSpy).toHaveBeenCalledWith(jobPostingId);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith({ userId, jobPostingId });

      expect(result).toEqual(newApplication);
    });
  });
});
