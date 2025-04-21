import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateHealthMetricDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @IsNotEmpty()
  value: any;
}

export class UpdateHealthMetricDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsObject()
  @IsOptional()
  value?: any;
}