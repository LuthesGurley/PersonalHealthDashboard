import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateHealthDto {
  @ApiProperty({ example: 'vitals', description: 'Type of health metric (e.g., vitals, diet)' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: { weight: 150, calories: 2000 }, description: 'Metric values' })
  @IsObject()
  @IsNotEmpty()
  value: any;
}

export class UpdateHealthDto {
  @ApiProperty({ example: 'vitals', description: 'Type of health metric', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ example: { weight: 148 }, description: 'Metric values', required: false })
  @IsObject()
  @IsOptional()
  value?: any;
}