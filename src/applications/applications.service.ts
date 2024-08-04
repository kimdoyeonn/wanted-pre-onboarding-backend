import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from '../entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JobPostingsService } from '../job-postings/job-postings.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private readonly jobPostingsService: JobPostingsService,
    private readonly usersService: UsersService,
  ) {}

  async apply(application: CreateApplicationDto) {
    const user = this.usersService.getOne(application.userId);

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    const jobPosting = this.jobPostingsService.getOne(application.jobPostingId);

    if (!jobPosting) {
      throw new NotFoundException(`job posting not found`);
    }

    const result = await this.applicationRepository.save(application);
    return result;
  }
}
