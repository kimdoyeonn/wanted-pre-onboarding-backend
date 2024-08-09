import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly nation: string;

  @IsString()
  readonly city: string;

  @IsNumber()
  readonly userId: number;
}
