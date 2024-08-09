import { Company } from 'src/entities/company.entity';

export class CompanyResponseDto {
  private constructor(
    private readonly id,
    private readonly name,
    private readonly nation,
    private readonly city,
  ) {}

  static of(company: Company) {
    return new CompanyResponseDto(
      company.id,
      company.name,
      company.nation,
      company.city,
    );
  }
}
