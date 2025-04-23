import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request, UseGuards, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HealthService } from './health.service';
import { CreateHealthDto, UpdateHealthDto } from './dto/health.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
@UseGuards(AuthGuard('jwt'))
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly healthService: HealthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new health metric' })
  @ApiBody({ type: CreateHealthDto })
  @ApiResponse({ status: 201, description: 'Health metric created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createHealthDto: CreateHealthDto, @Request() req) {
    this.logger.log(`Creating health metric for user: ${JSON.stringify(req.user)}`);
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.create(createHealthDto, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all health metrics for the user' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'List of health metrics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Request() req) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.findAll(req.user.sub, page, limit);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get summary of average weight and total calories' })
  @ApiResponse({ status: 200, description: 'Summary of health metrics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getSummary(@Request() req) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.getSummary(req.user.sub);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get health metrics by type' })
  @ApiParam({ name: 'type', description: 'Metric type (e.g., vitals, diet)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'List of health metrics by type' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findByType(
    @Param('type') type: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() req
  ) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.findByType(type, req.user.sub, page, limit);
  }

  @Get('weight')
  @ApiOperation({ summary: 'Get weight history for the user' })
  @ApiResponse({ status: 200, description: 'Weight history' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getWeightHistory(@Request() req) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.findWeightHistory(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a health metric by ID' })
  @ApiParam({ name: 'id', description: 'Health metric ID' })
  @ApiResponse({ status: 200, description: 'Health metric found' })
  @ApiResponse({ status: 400, description: 'Invalid ObjectId' })
  @ApiResponse({ status: 404, description: 'Health metric not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findById(@Param('id') id: string, @Request() req) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.findById(id, req.user.sub);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a health metric' })
  @ApiParam({ name: 'id', description: 'Health metric ID' })
  @ApiBody({ type: UpdateHealthDto })
  @ApiResponse({ status: 200, description: 'Health metric updated' })
  @ApiResponse({ status: 400, description: 'Invalid ObjectId' })
  @ApiResponse({ status: 404, description: 'Health metric not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateHealthDto: UpdateHealthDto, @Request() req) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.update(id, updateHealthDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a health metric' })
  @ApiParam({ name: 'id', description: 'Health metric ID' })
  @ApiResponse({ status: 204, description: 'Health metric deleted' })
  @ApiResponse({ status: 400, description: 'Invalid ObjectId' })
  @ApiResponse({ status: 404, description: 'Health metric not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') id: string, @Request() req) {
    if (!req.user || !req.user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.healthService.delete(id, req.user.sub);
  }
}