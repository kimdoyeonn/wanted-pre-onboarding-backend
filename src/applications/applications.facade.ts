import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JobPostingsService } from '../job-postings/job-postings.service';
import { UsersService } from '../users/users.service';
import { ApplicationsService } from './application.service';

@Injectable()
export class ApplicationFacade {
  constructor(
    private readonly applicationService: ApplicationsService,
    private readonly jobPostingsService: JobPostingsService,
    private readonly usersService: UsersService,
  ) {}

  async apply(application: CreateApplicationDto) {
    await this.usersService.getOne(application.userId);
    await this.jobPostingsService.getOne(application.jobPostingId);
    await this.applicationService.checkExistingApplication(application);

    const result = await this.applicationService.save({
      userId: application.userId,
      jobPostingId: application.jobPostingId,
    });

    return result;
  }
}
