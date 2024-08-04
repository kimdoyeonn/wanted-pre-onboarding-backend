import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from '../entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesRepository } from './companies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository],
})
export class CompaniesModule {}
