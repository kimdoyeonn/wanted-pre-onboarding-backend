import { IsNumber, IsString } from 'class-validator';

export class CreateJobPostingDto {
  @IsString()
  readonly position: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly stack: string;

  @IsNumber()
  readonly reward: number;

  @IsNumber()
  readonly companyId: number;
}
