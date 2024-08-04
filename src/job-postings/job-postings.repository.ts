import { Injectable } from '@nestjs/common';
import { JobPosting } from '../entities/job-posting.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class JobPostingsRepository extends Repository<JobPosting> {
  constructor(dataSource: DataSource) {
    super(JobPosting, dataSource.createEntityManager());
  }
}
