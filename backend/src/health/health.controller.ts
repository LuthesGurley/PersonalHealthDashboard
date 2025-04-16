import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthMetric } from './models/health-metric.schema';

@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async findAll(): Promise<HealthMetric[]> {
    return this.healthService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() metric: Partial<HealthMetric>): Promise<HealthMetric> {
    return this.healthService.create(metric);
  }

  @Get('weight')
  async findWeightHistory(): Promise<{ dates: string[]; weights: number[] }> {
    return this.healthService.findWeightHistory();
  }
}