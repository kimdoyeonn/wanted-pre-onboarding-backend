import { Body, Controller, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() company: CreateCompanyDto): Promise<CompanyResponseDto> {
    const result = await this.companiesService.create(company);
    return CompanyResponseDto.of(result);
  }
}
