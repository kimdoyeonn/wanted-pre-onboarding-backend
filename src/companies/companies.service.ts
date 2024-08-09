import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompaniesRepository) {}

  async getOne(id: number): Promise<Company | null> {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException(`Company with ${company.id} not found`);
    }

    return company;
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
