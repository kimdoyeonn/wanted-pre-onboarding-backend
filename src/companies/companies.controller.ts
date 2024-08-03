import { Body, Controller, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from 'src/entities/company.entity';
import { CreateCompanyDto } from './dto/create-company';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() company: CreateCompanyDto): Promise<Company> {
    return await this.companiesService.create(company);
  }
}
