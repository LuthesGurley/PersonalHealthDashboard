import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthMetric } from './models/health-metric.schema';
import { CreateHealthDto, UpdateHealthDto } from './dto/health.dto';
import { Types } from 'mongoose';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @InjectModel(HealthMetric.name)
    private healthMetricModel: Model<HealthMetric>
  ) {}

  async findAll(userId: string, page: number = 1, limit: number = 10): Promise<{ data: HealthMetric[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.healthMetricModel.find({ userId }).skip(skip).limit(limit).lean().exec(),
        this.healthMetricModel.countDocuments({ userId }).exec(),
      ]);
      return { data, total };
    } catch (error) {
      this.logger.error(`Error fetching metrics for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string, userId: string): Promise<HealthMetric> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid ObjectId: ${id}`);
      }
      const metric = await this.healthMetricModel.findOne({ _id: id, userId }).lean().exec();
      if (!metric) {
        throw new NotFoundException(`Health metric with ID ${id} not found`);
      }
      return metric;
    } catch (error) {
      this.logger.error(`Error fetching metric ${id} for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async findByType(type: string, userId: string, page: number = 1, limit: number = 10): Promise<{ data: HealthMetric[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.healthMetricModel.find({ type, userId }).skip(skip).limit(limit).lean().exec(),
        this.healthMetricModel.countDocuments({ type, userId }).exec(),
      ]);
      return { data, total };
    } catch (error) {
      this.logger.error(`Error fetching ${type} metrics for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async create(metric: CreateHealthDto, userId: string): Promise<HealthMetric> {
    try {
      const createdMetric = new this.healthMetricModel({
        ...metric,
        userId,
        date: new Date(),
      });
      return await createdMetric.save();
    } catch (error) {
      this.logger.error(`Error creating metric for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, metric: UpdateHealthDto, userId: string): Promise<HealthMetric> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid ObjectId: ${id}`);
      }
      const updatedMetric = await this.healthMetricModel
        .findOneAndUpdate({ _id: id, userId }, { $set: { ...metric, date: new Date() } }, { new: true })
        .exec();
      if (!updatedMetric) {
        throw new NotFoundException(`Health metric with ID ${id} not found`);
      }
      return updatedMetric;
    } catch (error) {
      this.logger.error(`Error updating metric ${id} for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid ObjectId: ${id}`);
      }
      const result = await this.healthMetricModel.findOneAndDelete({ _id: id, userId }).exec();
      if (!result) {
        throw new NotFoundException(`Health metric with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Error deleting metric ${id} for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async findWeightHistory(userId: string): Promise<{ dates: string[]; weights: number[] }> {
    try {
      const metrics = await this.healthMetricModel
        .find({ type: 'vitals', userId })
        .sort({ date: 1 })
        .lean()
        .exec();
      const dates = metrics.map(m => new Date(m.date).toISOString().split('T')[0]);
      const weights = metrics.map(m => m.value.weight || 0);
      return { dates, weights };
    } catch (error) {
      this.logger.error(`Error fetching weight history for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async getSummary(userId: string): Promise<{ avgWeight: number; totalCalories: number }> {
    try {
      const vitals = await this.healthMetricModel.find({ type: 'vitals', userId }).lean().exec();
      const diet = await this.healthMetricModel.find({ type: 'diet', userId }).lean().exec();
      
      const avgWeight = vitals.length
        ? vitals.reduce((sum, m) => sum + (m.value.weight || 0), 0) / vitals.length
        : 0;
      const totalCalories = diet.reduce((sum, m) => sum + (m.value.calories || 0), 0);
      
      return { avgWeight, totalCalories };
    } catch (error) {
      this.logger.error(`Error fetching summary for user ${userId}: ${error.message}`);
      throw error;
    }
  }
}