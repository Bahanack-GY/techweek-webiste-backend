import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './create-registration.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) { }

  @Post()
  create(@Body() dto: CreateRegistrationDto) {
    return this.registrationService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('contestType') contestType?: string) {
    if (contestType) {
      return this.registrationService.findByContest(contestType);
    }
    return this.registrationService.findAll();
  }
}
