import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

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
