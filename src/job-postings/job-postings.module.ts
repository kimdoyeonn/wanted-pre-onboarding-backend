import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from '../entities/job-posting.entity';
import { JobPostingsRepository } from './job-postings.repository';
import { JobPostingFacade } from './job-postings.facade';
import { CompaniesService } from '../companies/companies.service';
import { ApplicationsService } from '../applications/application.service';
import { CompaniesRepository } from 'src/companies/companies.repository';
import { ApplicationRepository } from 'src/applications/application.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  providers: [
    JobPostingsService,
    JobPostingsRepository,
    JobPostingFacade,
    CompaniesService,
    ApplicationsService,
    CompaniesRepository,
    ApplicationRepository,
  ],
  controllers: [JobPostingsController],
})
export class JobPostingsModule {}
