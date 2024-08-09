import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from '../entities/job-posting.entity';
import { JobPostingsRepository } from './job-postings.repository';
import { CompaniesRepository } from '../companies/companies.repository';
import { ApplicationRepository } from 'src/applications/application.repository';
import { JobPostingFacade } from './job-postings.facade';
import { CompaniesService } from 'src/companies/companies.service';
import { ApplicationsService } from 'src/applications/application.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  providers: [
    JobPostingsService,
    JobPostingsRepository,
    CompaniesRepository,
    ApplicationRepository,
    JobPostingFacade,
    CompaniesService,
    ApplicationsService,
  ],
  controllers: [JobPostingsController],
})
export class JobPostingsModule {}
