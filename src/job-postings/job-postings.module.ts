import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from 'src/entities/job-posting.entity';
import { JobPostingsRepository } from './job-postings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  providers: [JobPostingsService, JobPostingsRepository],
  controllers: [JobPostingsController],
})
export class JobPostingsModule {}
