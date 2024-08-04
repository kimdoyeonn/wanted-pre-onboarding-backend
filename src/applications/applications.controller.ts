import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async apply(@Body() application: CreateApplicationDto) {
    return await this.applicationsService.apply(application);
  }
}
