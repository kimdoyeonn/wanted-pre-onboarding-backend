import { IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly jobPostingId: number;
}
