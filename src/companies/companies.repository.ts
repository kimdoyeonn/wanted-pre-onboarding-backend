import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompaniesRepository extends Repository<Company> {
  constructor(dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }
}
