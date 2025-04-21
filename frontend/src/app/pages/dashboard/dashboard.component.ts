import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health.service';
import { MatTableModule } from '@angular/material/table';
import { HealthFormComponent } from '../../components/health-form/health-form.component';
import { HealthMetric } from '../../models/health-metric';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    HealthFormComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'value', 'actions'];
  dataSource: HealthMetric[] = [];
  totalRecords: number = 0;
  page: number = 1;
  limit: number = 10;
  selectedType: string = 'all';
  summary: { avgWeight: number; totalCalories: number } = { avgWeight: 0, totalCalories: 0 };
  isEditing: { [key: string]: boolean } = {};

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadMetrics();
    this.loadSummary();
  }

  loadMetrics() {
    const fetchMethod = this.selectedType === 'all'
      ? this.healthService.getHealthMetrics(this.page, this.limit)
      : this.healthService.getMetricsByType(this.selectedType, this.page, this.limit);

    fetchMethod.subscribe({
      next: ({ data, total }) => {
        this.dataSource = data;
        this.totalRecords = total;
      },
      error: (err) => console.error('Error fetching health metrics:', err)
    });
  }

  loadSummary() {
    this.healthService.getSummary().subscribe({
      next: (summary) => {
        this.summary = summary;
      },
      error: (err) => console.error('Error fetching summary:', err)
    });
  }

  filterByType() {
    this.page = 1;
    this.loadMetrics();
  }

  toggleEdit(metric: HealthMetric) {
    this.isEditing[metric._id] = !this.isEditing[metric._id];
  }

  saveMetric(metric: HealthMetric) {
    this.healthService.updateHealthMetric(metric._id, {
      type: metric.type,
      value: metric.value,
    }).subscribe({
      next: () => {
        this.isEditing[metric._id] = false;
        this.loadMetrics();
      },
      error: (err) => console.error('Error updating metric:', err)
    });
  }

  deleteMetric(id: string) {
    if (confirm('Are you sure you want to delete this metric?')) {
      this.healthService.deleteHealthMetric(id).subscribe({
        next: () => this.loadMetrics(),
        error: (err) => console.error('Error deleting metric:', err)
      });
    }
  }

  changePage(increment: number) {
    this.page += increment;
    if (this.page < 1) this.page = 1;
    if (this.page > this.getTotalPages()) {
      this.page = this.getTotalPages();
    }
    this.loadMetrics();
  }

  getTotalPages(): number {
    return this.totalRecords ? Math.ceil(this.totalRecords / this.limit) : 1;
  }
}