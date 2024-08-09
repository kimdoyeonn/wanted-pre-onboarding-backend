import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationFacade } from './applications.facade';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationResponseDto } from './dto/application-response.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationFacade: ApplicationFacade) {}

  @Post()
  async apply(@Body() application: CreateApplicationDto) {
    const result = await this.applicationFacade.apply(application);
    return ApplicationResponseDto.of(result);
  }
}
