import { Injectable, NotFoundException } from '@nestjs/common';
import { JobPosting } from '../entities/job-posting.entity';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { JobPostingsRepository } from './job-postings.repository';

@Injectable()
export class JobPostingsService {
  constructor(private jobPostingRepository: JobPostingsRepository) {}

  async getOne(id: number) {
    return await this.jobPostingRepository.findOne({ where: { id } });
  }

  async getByCompanyId(companyId: number): Promise<{ id: number }[]> {
    return await this.jobPostingRepository.find({
      select: { id: true },
      where: { company: { id: companyId } },
    });
  }

  async getOneWithCompanyById(id: number) {
    const jobPosting = await this.jobPostingRepository.findOne({
      relations: { company: true },
      where: { id },
    });

    if (!jobPosting) {
      throw new NotFoundException('존재하지 않는 채용공고입니다.');
    }

    return jobPosting;
  }

  async getAll() {
    const jobPostings = await this.jobPostingRepository.find({
      relations: { company: true },
    });

    return jobPostings;
  }

  async create(jobPosting: CreateJobPostingDto): Promise<JobPosting> {
    return await this.jobPostingRepository.save(jobPosting);
  }

  async update(id: number, jobPosting: UpdateJobPostingDto) {
    const existingJobPosting = await this.jobPostingRepository.findOne({
      where: { id },
    });

    if (!existingJobPosting) {
      throw new NotFoundException(`Job Posting with ${id} not found`);
    }

    const updatedJobPosting = await this.jobPostingRepository.save({
      ...existingJobPosting,
      ...jobPosting,
    });

    return updatedJobPosting;
  }

  async delete(id: number) {
    const existingJobPosting = await this.jobPostingRepository.findOne({
      where: { id },
    });

    if (!existingJobPosting) {
      throw new NotFoundException(`Job Posting with ${id} not found`);
    }

    // TODO application 삭제

    const result = await this.jobPostingRepository.delete({ id });

    return result;
  }

  // TODO 검색
}
