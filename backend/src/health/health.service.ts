import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthMetric } from './models/health-metric.schema';
import { CreateHealthMetricDto, UpdateHealthMetricDto } from './dto/health-metric.dto';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(@InjectModel(HealthMetric.name) private healthMetricModel: Model<HealthMetric>) {}

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: HealthMetric[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.healthMetricModel.find().skip(skip).limit(limit).lean().exec(),
        this.healthMetricModel.countDocuments().exec(),
      ]);
      return { data, total };
    } catch (error) {
      this.logger.error(`Error fetching all metrics: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<HealthMetric> {
    try {
      const metric = await this.healthMetricModel.findById(id).lean().exec();
      if (!metric) {
        throw new NotFoundException(`Health metric with ID ${id} not found`);
      }
      return metric;
    } catch (error) {
      this.logger.error(`Error fetching metric by ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByType(type: string, page: number = 1, limit: number = 10): Promise<{ data: HealthMetric[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.healthMetricModel.find({ type }).skip(skip).limit(limit).lean().exec(),
        this.healthMetricModel.countDocuments({ type }).exec(),
      ]);
      return { data, total };
    } catch (error) {
      this.logger.error(`Error fetching metrics by type ${type}: ${error.message}`);
      throw error;
    }
  }

  async create(metric: CreateHealthMetricDto): Promise<HealthMetric> {
    try {
      const createdMetric = new this.healthMetricModel({
        ...metric,
        userId: 'test-user', 
        date: new Date(),
      });
      return await createdMetric.save();
    } catch (error) {
      this.logger.error(`Error creating metric: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, metric: UpdateHealthMetricDto): Promise<HealthMetric> {
    try {
      const updatedMetric = await this.healthMetricModel
        .findByIdAndUpdate(id, { $set: { ...metric, date: new Date() } }, { new: true })
        .exec();
      if (!updatedMetric) {
        throw new NotFoundException(`Health metric with ID ${id} not found`);
      }
      return updatedMetric;
    } catch (error) {
      this.logger.error(`Error updating metric with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.healthMetricModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Health metric with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Error deleting metric with ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findWeightHistory(): Promise<{ dates: string[]; weights: number[] }> {
    try {
      const metrics = await this.healthMetricModel
        .find({ type: 'vitals' })
        .sort({ date: 1 })
        .lean()
        .exec();
      const dates = metrics.map(m => new Date(m.date).toISOString().split('T')[0]);
      const weights = metrics.map(m => m.value.weight || 0);
      return { dates, weights };
    } catch (error) {
      this.logger.error(`Error fetching weight history: ${error.message}`);
      throw error;
    }
  }

  async getSummary(): Promise<{ avgWeight: number; totalCalories: number }> {
    try {
      const vitals = await this.healthMetricModel.find({ type: 'vitals' }).lean().exec();
      const diet = await this.healthMetricModel.find({ type: 'diet' }).lean().exec();
      
      const avgWeight = vitals.length
        ? vitals.reduce((sum, m) => sum + (m.value.weight || 0), 0) / vitals.length
        : 0;
      const totalCalories = diet.reduce((sum, m) => sum + (m.value.calories || 0), 0);
      
      return { avgWeight, totalCalories };
    } catch (error) {
      this.logger.error(`Error fetching summary: ${error.message}`);
      throw error;
    }
  }
}