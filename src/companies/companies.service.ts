import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findOne(id: number): Promise<Company | null> {
    return await this.companyRepository.findOneBy({ id });
  }

  async findByUserId(userId: number): Promise<Company | null> {
    const company = await this.companyRepository.findOneBy({ userId });
    return company;
  }

  async create(company: CreateCompanyDto): Promise<Company> {
    try {
      const existingCompany = this.findByUserId(company.userId);
      if (existingCompany) {
        throw new ConflictException('User already has a company');
      }
      return await this.companyRepository.save(company);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
