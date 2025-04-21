import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health.service';
import { MatTableModule } from '@angular/material/table';
import { HealthFormComponent } from '../../components/health-form/health-form.component';
import { HealthMetric } from '../../models/health-metric';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, HealthFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'value'];
  dataSource: HealthMetric[] = [];

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.healthService.getHealthMetrics().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => console.error('Error fetching health metrics:', err)
    });
  }
}