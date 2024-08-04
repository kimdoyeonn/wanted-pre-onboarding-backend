import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../entities/application.entity';
import { JobPostingsService } from 'src/job-postings/job-postings.service';
import { UsersService } from 'src/users/users.service';
import { JobPostingsRepository } from 'src/job-postings/job-postings.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [
    ApplicationsService,
    JobPostingsService,
    UsersService,
    JobPostingsRepository,
    UsersRepository,
  ],
})
export class ApplicationsModule {}
