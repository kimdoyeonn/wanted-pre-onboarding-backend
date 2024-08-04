import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JobPostingsService } from '../job-postings/job-postings.service';
import { UsersService } from '../users/users.service';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class ApplicationsService {
  constructor(
    private applicationRepository: ApplicationRepository,
    private readonly jobPostingsService: JobPostingsService,
    private readonly usersService: UsersService,
  ) {}

  async getByJobPostingId(jobPostingId: number) {
    const result = await this.applicationRepository.findBy({ jobPostingId });
    return result;
  }

  async delete(id: number) {
    return await this.applicationRepository.delete({ id });
  }

  async apply(application: CreateApplicationDto) {
    const user = await this.usersService.getOne(application.userId);

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    const jobPosting = await this.jobPostingsService.getOne(
      application.jobPostingId,
    );

    if (!jobPosting) {
      throw new NotFoundException(`job posting not found`);
    }

    const existingApplication = await this.applicationRepository.findOne({
      where: application,
    });

    if (existingApplication) {
      throw new ConflictException(`already applied job posting`);
    }

    const result = await this.applicationRepository.save(application);
    return result;
  }
}
