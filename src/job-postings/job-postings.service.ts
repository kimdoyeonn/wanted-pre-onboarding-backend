import { Injectable, NotFoundException } from '@nestjs/common';
import { JobPosting } from '../entities/job-posting.entity';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { JobPostingsRepository } from './job-postings.repository';
import { Like } from 'typeorm';

export type JobPostingId = { id: number };
export type JobPostingIds = JobPostingId[];

@Injectable()
export class JobPostingsService {
  constructor(private jobPostingRepository: JobPostingsRepository) {}

  async getOne(id: number) {
    const jobPosting = await this.jobPostingRepository.findOne({
      where: { id },
    });

    if (!jobPosting) {
      throw new NotFoundException('job posting not found');
    }

    return jobPosting;
  }

  async getByCompanyId(companyId: number): Promise<JobPostingIds> {
    const jobPosting = await this.jobPostingRepository.find({
      select: { id: true },
      where: { company: { id: companyId } },
    });

    return jobPosting;
  }

  async getOneWithCompanyById(id: number): Promise<JobPosting> {
    const jobPosting = await this.jobPostingRepository.findOne({
      relations: { company: true },
      where: { id },
    });

    if (!jobPosting) {
      throw new NotFoundException('job posting not found');
    }

    return jobPosting;
  }

  async getAllWithQuery(query?: string) {
    const jobPostings = await this.jobPostingRepository.find({
      relations: { company: true },
      where: [
        {
          position: Like(`%${query}%`),
        },
        {
          stack: Like(`%${query}%`),
        },
        {
          company: {
            name: Like(`%${query}%`),
          },
        },
        {
          company: {
            nation: Like(`%${query}%`),
          },
        },
        {
          company: {
            city: Like(`%${query}%`),
          },
        },
        {
          description: Like(`%${query}%`),
        },
      ],
    });

    return jobPostings;
  }

  async getAll() {
    const jobPostings = await this.jobPostingRepository.find({
      relations: { company: true },
    });

    return jobPostings;
  }

  async save(jobPosting: CreateJobPostingDto) {
    const result = this.jobPostingRepository.save({
      position: jobPosting.position,
      description: jobPosting.description,
      stack: jobPosting.stack,
      reward: jobPosting.reward,
      companyId: jobPosting.companyId,
    });

    return result;
  }

  async update(id: number, jobPosting: UpdateJobPostingDto) {
    const result = await this.jobPostingRepository.update(id, jobPosting);
    return result;
  }

  async delete(id: number) {
    const result = await this.jobPostingRepository.delete(id);
    return result;
  }
}
