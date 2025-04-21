import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthMetric } from '../models/health-metric';

type CreateHealthMetric = Omit<HealthMetric, '_id'>;

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHealthMetrics(page: number = 1, limit: number = 10): Observable<{ data: HealthMetric[]; total: number }> {
    return this.http.get<{ data: HealthMetric[]; total: number }>(`${this.apiUrl}/health?page=${page}&limit=${limit}`);
  }

  getHealthMetricById(id: string): Observable<HealthMetric> {
    return this.http.get<HealthMetric>(`${this.apiUrl}/health/${id}`);
  }

  getMetricsByType(type: string, page: number = 1, limit: number = 10): Observable<{ data: HealthMetric[]; total: number }> {
    return this.http.get<{ data: HealthMetric[]; total: number }>(`${this.apiUrl}/health/types/${type}?page=${page}&limit=${limit}`);
  }

  logHealthMetric(metric: CreateHealthMetric): Observable<HealthMetric> {
    return this.http.post<HealthMetric>(`${this.apiUrl}/health`, metric);
  }

  updateHealthMetric(id: string, metric: Partial<HealthMetric>): Observable<HealthMetric> {
    return this.http.put<HealthMetric>(`${this.apiUrl}/health/${id}`, metric);
  }

  deleteHealthMetric(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/health/${id}`);
  }

  getWeightHistory(): Observable<{ dates: string[]; weights: number[] }> {
    return this.http.get<{ dates: string[]; weights: number[] }>(`${this.apiUrl}/health/weight`);
  }

  getSummary(): Observable<{ avgWeight: number; totalCalories: number }> {
    return this.http.get<{ avgWeight: number; totalCalories: number }>(`${this.apiUrl}/health/summary`);
  }
}