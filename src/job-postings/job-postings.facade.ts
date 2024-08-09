import { JobPosting } from 'src/entities/job-posting.entity';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { JobPostingsService } from './job-postings.service';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { ApplicationsService } from 'src/applications/application.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JobPostingFacade {
  constructor(
    private companiesService: CompaniesService,
    private jobPostingsService: JobPostingsService,
    private applicationsService: ApplicationsService,
  ) {}

  async create(jobPosting: CreateJobPostingDto): Promise<JobPosting> {
    const company = await this.companiesService.getOne(jobPosting.companyId);

    const result = await this.jobPostingsService.save({
      position: jobPosting.position,
      description: jobPosting.description,
      stack: jobPosting.stack,
      reward: jobPosting.reward,
      companyId: jobPosting.companyId,
    });

    return { ...result, company } as JobPosting;
  }

  async update(id: number, jobPosting: UpdateJobPostingDto) {
    const updatedJobPosting = await this.jobPostingsService.getOne(id);

    if (jobPosting.reward) {
      updatedJobPosting.reward = jobPosting.reward;
    }

    if (jobPosting.description) {
      updatedJobPosting.description = jobPosting.description;
    }

    if (jobPosting.position) {
      updatedJobPosting.position = jobPosting.position;
    }

    if (jobPosting.stack) {
      updatedJobPosting.stack = jobPosting.stack;
    }

    await this.jobPostingsService.update(id, {
      reward: updatedJobPosting.reward,
      description: updatedJobPosting.description,
      position: updatedJobPosting.position,
      stack: updatedJobPosting.stack,
    });

    return updatedJobPosting;
  }

  async delete(id: number) {
    const existingJobPosting = await this.jobPostingsService.getOne(id);

    const applications = await this.applicationsService.getByJobPostingId(
      existingJobPosting.id,
    );

    if (applications) {
      const promises = applications.map((application) =>
        this.applicationsService.delete(application.id),
      );
      Promise.all(promises);
    }

    const result = await this.jobPostingsService.delete(id);

    return result;
  }
}
