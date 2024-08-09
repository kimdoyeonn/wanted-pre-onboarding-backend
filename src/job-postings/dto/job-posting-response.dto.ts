import { JobPosting } from 'src/entities/job-posting.entity';
import { JobPostingIds } from '../job-postings.service';

export class JobPostingResponseDto {
  private constructor(
    private readonly id,
    private readonly companyName,
    private readonly nation,
    private readonly city,
    private readonly position,
    private readonly reward,
    private readonly stack,
    private readonly description,
    private readonly otherJobPostings?,
  ) {}

  static of(job: JobPosting, ids?: JobPostingIds) {
    return new JobPostingResponseDto(
      job.id,
      job.company.name,
      job.company.nation,
      job.company.city,
      job.position,
      job.reward,
      job.stack,
      job.description,
      ids ? ids.map((jp) => jp.id) : undefined,
    );
  }
}
