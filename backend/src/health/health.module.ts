import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { HealthMetric, HealthMetricSchema } from './models/health-metric.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HealthMetric.name, schema: HealthMetricSchema }]),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}