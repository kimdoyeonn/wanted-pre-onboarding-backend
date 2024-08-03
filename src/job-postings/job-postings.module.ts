import { Module } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { JobPostingsController } from './job-postings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosting } from 'src/entities/job-posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  providers: [JobPostingsService],
  controllers: [JobPostingsController],
})
export class JobPostingsModule {}
