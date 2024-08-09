import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationFacade } from './applications.facade';

describe('ApplicationsController', () => {
  let applicationsController: ApplicationsController;
  let applicationFacade: ApplicationFacade;

  const mockApplicationService = {
    apply: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        { provide: ApplicationFacade, useValue: mockApplicationService },
      ],
    }).compile();

    applicationsController = module.get<ApplicationsController>(
      ApplicationsController,
    );
    applicationFacade = module.get<ApplicationFacade>(ApplicationFacade);
  });

  it('should be defined', () => {
    expect(applicationsController).toBeDefined();
    expect(applicationFacade).toBeDefined();
  });

  describe('apply', () => {
    it('공고에 지원하고 생성된 application 객체를 반환', async () => {
      const jobPostingId = 2;
      const userId = 1;

      const applyResult = {
        id: 1,
        jobPostingId,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // user가 존재하는지 확인
      // user가 지원 이력이 있는지 확인
      // jobPostingId가 존재하는지 확인

      // 지원

      const applySpy = jest
        .spyOn(applicationFacade, 'apply')
        .mockResolvedValue(applyResult);

      const response = await applicationsController.apply({
        jobPostingId,
        userId,
      });

      expect(applySpy).toHaveBeenCalled();
      expect(applySpy).toHaveBeenCalledWith({ userId, jobPostingId });

      expect(response).toEqual(applyResult);
    });
  });
});
