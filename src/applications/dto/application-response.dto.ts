import { Application } from 'src/entities/application.entity';

export class ApplicationResponseDto {
  private constructor(
    private readonly id,
    private readonly userId,
    private readonly jobPostingId,
  ) {}

  static of(application: Application) {
    return new ApplicationResponseDto(
      application.id,
      application.userId,
      application.jobPostingId,
    );
  }
}
