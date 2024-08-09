import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationFacade } from './applications.facade';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../entities/application.entity';
import { JobPostingsService } from 'src/job-postings/job-postings.service';
import { UsersService } from 'src/users/users.service';
import { JobPostingsRepository } from 'src/job-postings/job-postings.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CompaniesRepository } from 'src/companies/companies.repository';
import { ApplicationRepository } from './application.repository';
import { ApplicationsService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [
    ApplicationRepository,
    ApplicationFacade,
    ApplicationsService,
    JobPostingsService,
    UsersService,
    JobPostingsRepository,
    UsersRepository,
    CompaniesRepository,
  ],
})
export class ApplicationsModule {}
