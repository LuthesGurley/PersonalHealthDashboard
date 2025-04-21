import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthService } from '../../services/health.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HealthFormComponent } from '../../components/health-form/health-form.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, HealthFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  lineChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  lineChartType: ChartType = 'line';
  chartOptions: ChartConfiguration['options'] = {
    scales: { y: { beginAtZero: false } }
  };

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.healthService.getWeightHistory().subscribe({
      next: (data) => {
        this.lineChartData = {
          labels: data.dates,
          datasets: [{
            data: data.weights,
            label: 'Weight (lbs)',
            borderColor: '#1976d2',
            fill: false
          }]
        };
      },
      error: (err) => console.error('Error fetching weight history:', err)
    });
  }
}