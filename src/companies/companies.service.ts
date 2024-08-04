import { ConflictException, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from './dto/create-company';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompaniesRepository) {}

  async getOne(id: number): Promise<Company | null> {
    return await this.companyRepository.findOneBy({ id });
  }

  async getByUserId(userId: number): Promise<Company | null> {
    const company = await this.companyRepository.findOneBy({ userId });
    return company;
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    const existingCompany = await this.getByUserId(company.userId);

    if (existingCompany) {
      throw new ConflictException('User already has a company');
    }
    return await this.companyRepository.save(company);
  }
}
