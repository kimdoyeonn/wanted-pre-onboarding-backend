import { ConflictException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationRepository: ApplicationRepository) {}

  async getByJobPostingId(jobPostingId: number) {
    const result = await this.applicationRepository.findBy({ jobPostingId });
    return result;
  }

  async delete(id: number) {
    const result = await this.applicationRepository.delete({ id });
    return result;
  }

  async save(application: CreateApplicationDto) {
    const result = await this.applicationRepository.save({
      userId: application.userId,
      jobPostingId: application.jobPostingId,
    });

    return result;
  }

  async getApplication(application: CreateApplicationDto) {
    const result = await this.applicationRepository.findOne({
      where: application,
    });

    return result;
  }

  async checkExistingApplication(application: CreateApplicationDto) {
    const existingApplication = await this.applicationRepository.findOne({
      where: application,
    });

    if (existingApplication) {
      throw new ConflictException(`already applied job posting`);
    }
  }
}
