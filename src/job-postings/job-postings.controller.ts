import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JobPostingsService } from './job-postings.service';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { JobPostingResponseDto } from './dto/job-posting-response.dto';
import { JobPostingFacade } from './job-postings.facade';

@Controller('job-postings')
export class JobPostingsController {
  constructor(
    private readonly jobPostingsService: JobPostingsService,
    private readonly jobPostingFacade: JobPostingFacade,
  ) {}

  @Get()
  async getAll(
    @Query('search') search?: string,
  ): Promise<JobPostingResponseDto[]> {
    const jobPostings = search
      ? await this.jobPostingsService.getAllWithQuery(search)
      : await this.jobPostingsService.getAll();

    const jobPostingResponses = jobPostings.map((jp) =>
      JobPostingResponseDto.of(jp),
    );

    return jobPostingResponses;
  }

  @Post()
  async create(
    @Body() jobPosting: CreateJobPostingDto,
  ): Promise<JobPostingResponseDto> {
    const result = await this.jobPostingFacade.create({
      position: jobPosting.position,
      description: jobPosting.description,
      stack: jobPosting.stack,
      reward: jobPosting.reward,
      companyId: jobPosting.companyId,
    });
    return JobPostingResponseDto.of(result);
  }

  @Get('/:id')
  async getOne(
    @Param('id') jobPostingId: number,
  ): Promise<JobPostingResponseDto> {
    const jobPosting =
      await this.jobPostingsService.getOneWithCompanyById(jobPostingId);

    const otherJobPostings = await this.jobPostingsService.getByCompanyId(
      jobPosting.company.id,
    );

    return JobPostingResponseDto.of(jobPosting, otherJobPostings);
  }

  @Patch('/:id')
  async update(
    @Param('id') jobPostingId: number,
    @Body() jobPosting: UpdateJobPostingDto,
  ) {
    await this.jobPostingFacade.update(jobPostingId, jobPosting);
  }

  @Delete('/:id')
  async delete(@Param('id') jobPostingId: number) {
    await this.jobPostingFacade.delete(jobPostingId);
  }
}
