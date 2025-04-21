import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthMetric } from '../models/health-metric';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = 'http://backend:3000/api';

  constructor(private http: HttpClient) {}

  logHealthMetric(metric: HealthMetric): Observable<any> {
    return this.http.post(`${this.apiUrl}/health`, metric);
  }

  getWeightHistory(): Observable<{ dates: string[], weights: number[] }> {
    return this.http.get<{ dates: string[], weights: number[] }>(`${this.apiUrl}/health/weight`);
  }

  getHealthMetrics(): Observable<HealthMetric[]> {
    return this.http.get<HealthMetric[]>(`${this.apiUrl}/health`);
  }
}