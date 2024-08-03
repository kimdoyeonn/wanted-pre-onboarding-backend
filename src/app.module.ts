import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { JobPosting } from './entities/job-posting.entity';
import { Application } from './entities/application.entity';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { JobPostingsModule } from './job-postings/job-postings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      logging: true,
      synchronize: false,
      entities: [User, Company, JobPosting, Application],
    }),
    CompaniesModule,
    JobPostingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
