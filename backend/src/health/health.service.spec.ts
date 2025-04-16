import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { getModelToken } from '@nestjs/mongoose';
import { HealthMetric } from './models/health-metric.schema';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: getModelToken(HealthMetric.name),
          useValue: {}, // Mock Mongoose model
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});