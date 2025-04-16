import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthMetric } from './models/health-metric.schema';

@Injectable()
export class HealthService {
  constructor(@InjectModel(HealthMetric.name) private healthMetricModel: Model<HealthMetric>) {}

  async findAll(): Promise<HealthMetric[]> {
    return this.healthMetricModel.find().lean().exec();
  }

  async create(metric: Partial<HealthMetric>): Promise<HealthMetric> {
    const createdMetric = new this.healthMetricModel({
      ...metric,
      userId: 'test-user', // Replace with auth later
      date: new Date(),
    });
    return createdMetric.save();
  }

  async findWeightHistory(): Promise<{ dates: string[]; weights: number[] }> {
    const metrics = await this.healthMetricModel
      .find({ type: 'vitals' })
      .sort({ date: 1 })
      .lean()
      .exec();
    const dates = metrics.map(m => new Date(m.date).toISOString().split('T')[0]);
    const weights = metrics.map(m => m.value.weight || 0);
    return { dates, weights };
  }
}