import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class HealthMetric extends Document {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  type: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  value: any;

  @Prop({ default: Date.now, index: true })
  date: Date;
}

export const HealthMetricSchema = SchemaFactory.createForClass(HealthMetric);

HealthMetricSchema.index({ userId: 1, type: 1, date: -1 });