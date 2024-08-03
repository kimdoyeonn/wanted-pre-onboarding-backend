import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';

@Controller('job-postings')
export class JobPostingsController {
  constructor(private readonly jobPostingsService: JobPostingsService) {}

  @Get()
  async getAll() {
    const jobPostings = await this.jobPostingsService.getAll();
    const parsedJobPostings = jobPostings.map((jp) => ({
      id: jp.id,
      companyName: jp.company.name,
      nation: jp.company.nation,
      city: jp.company.city,
      position: jp.position,
      reward: jp.reward,
      stack: jp.stack,
    }));

    return parsedJobPostings;
  }

  @Post()
  async create(@Body() jobPosting: CreateJobPostingDto) {
    return await this.jobPostingsService.create(jobPosting);
  }

  @Get('/:id')
  async getOne(@Param('id') jobPostingId: number) {
    const jobPosting =
      await this.jobPostingsService.getOneWithCompanyById(jobPostingId);

    const otherJobPostings = await this.jobPostingsService.getByCompanyId(
      jobPosting.company.id,
    );

    const parsedJobPostings = {
      id: jobPosting.id,
      companyName: jobPosting.company.name,
      nation: jobPosting.company.nation,
      city: jobPosting.company.city,
      position: jobPosting.position,
      reward: jobPosting.reward,
      stack: jobPosting.stack,
      description: jobPosting.description,
      otherJobPostings: otherJobPostings.map((jp) => jp.id),
    };

    return parsedJobPostings;
  }

  @Patch('/:id')
  async update(
    @Param('id') jobPostingId: number,
    @Body() jobPosting: UpdateJobPostingDto,
  ) {
    return await this.jobPostingsService.update(jobPostingId, jobPosting);
  }
}
