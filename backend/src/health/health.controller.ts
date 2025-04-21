import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthMetric } from './models/health-metric.schema';
import { CreateHealthMetricDto, UpdateHealthMetricDto } from './dto/health-metric.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('summary')
  async getSummary(): Promise<{ avgWeight: number; totalCalories: number }> {
    return this.healthService.getSummary();
  }

  @Get('weight')
  async getWeightHistory(): Promise<{ dates: string[]; weights: number[] }> {
    return this.healthService.findWeightHistory();
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ): Promise<{ data: HealthMetric[]; total: number }> {
    return this.healthService.findAll(+page, +limit);
  }

  @Get('types/:type')
  async findByType(
    @Param('type') type: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ): Promise<{ data: HealthMetric[]; total: number }> {
    return this.healthService.findByType(type, +page, +limit);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<HealthMetric> {
    return this.healthService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() metric: CreateHealthMetricDto): Promise<HealthMetric> {
    return this.healthService.create(metric);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() metric: UpdateHealthMetricDto
  ): Promise<HealthMetric> {
    return this.healthService.update(id, metric);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.healthService.delete(id);
  }
}