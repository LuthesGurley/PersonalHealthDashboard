import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/healthdb', {
      connectionName: 'healthdb',
    }),
    HealthModule,
  ],
})
export class AppModule {}