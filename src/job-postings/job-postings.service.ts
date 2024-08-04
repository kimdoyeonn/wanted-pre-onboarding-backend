import { Injectable, NotFoundException } from '@nestjs/common';
import { JobPosting } from '../entities/job-posting.entity';
import { CreateJobPostingDto } from './dto/create-job-posting.dto';
import { UpdateJobPostingDto } from './dto/update-job-posting.dto';
import { JobPostingsRepository } from './job-postings.repository';
import { CompaniesRepository } from '../companies/companies.repository';
import { ApplicationRepository } from 'src/applications/application.repository';
import { Like } from 'typeorm';

@Injectable()
export class JobPostingsService {
  constructor(
    private jobPostingRepository: JobPostingsRepository,
    private CompanyRepository: CompaniesRepository,
    private applicationRepository: ApplicationRepository,
  ) {}

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
      throw new NotFoundException('job posting not found');
    }

    return jobPosting;
  }

  async getAll(search?: string) {
    const jobPostings = await this.jobPostingRepository.find({
      relations: { company: true },
      ...(search
        ? {
            where: [
              {
                position: Like(`%${search}%`),
              },
              {
                stack: Like(`%${search}%`),
              },
              {
                company: {
                  name: Like(`%${search}%`),
                },
              },
              {
                company: {
                  nation: Like(`%${search}%`),
                },
              },
              {
                company: {
                  city: Like(`%${search}%`),
                },
              },
              {
                description: Like(`%${search}%`),
              },
            ],
          }
        : {}),
    });

    return jobPostings;
  }

  async create(jobPosting: CreateJobPostingDto): Promise<JobPosting> {
    const existingCompany = await this.CompanyRepository.findOneBy({
      id: jobPosting.companyId,
    });

    if (!existingCompany) {
      throw new NotFoundException(
        `Company with ${jobPosting.companyId} not found`,
      );
    }

    const result = await this.jobPostingRepository.save(jobPosting);
    return result;
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

    const applications = await this.applicationRepository.findBy({
      jobPostingId: existingJobPosting.id,
    });

    if (applications) {
      const promises = applications.map((application) =>
        this.applicationRepository.delete({ id: application.id }),
      );
      Promise.all(promises);
    }

    const result = await this.jobPostingRepository.delete({ id });

    return result;
  }

  // TODO 검색
}
