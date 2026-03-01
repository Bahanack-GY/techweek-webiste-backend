import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get()
    getStats() {
        return this.analyticsService.getStats();
    }

    @Post('download')
    incrementDownload() {
        return this.analyticsService.incrementDownload();
    }

    @Post('share')
    incrementShare() {
        return this.analyticsService.incrementShare();
    }
}
