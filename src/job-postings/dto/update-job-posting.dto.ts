import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateJobPostingDto } from './create-job-posting.dto';

export class UpdateJobPostingDto extends PartialType(
  OmitType(CreateJobPostingDto, ['companyId'] as const),
) {}
