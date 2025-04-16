import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class HealthMetric extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  value: any;

  @Prop({ default: Date.now })
  date: Date;
}

export const HealthMetricSchema = SchemaFactory.createForClass(HealthMetric);