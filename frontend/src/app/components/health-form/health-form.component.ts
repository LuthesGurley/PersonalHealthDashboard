import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HealthService } from '../../services/health.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './health-form.component.html',
  styleUrls: ['./health-form.component.scss']
})
export class HealthFormComponent {
  @Output() metricLogged = new EventEmitter<void>();
  healthForm: any;

  constructor(private fb: FormBuilder, private healthService: HealthService) {
    this.healthForm = this.fb.group({
      type: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.healthForm.valid) {
      const metric = {
        type: this.healthForm.value.type,
        value: {
          [this.healthForm.value.type === 'diet' ? 'calories' :
           this.healthForm.value.type === 'vitals' ? 'weight' :
           this.healthForm.value.type === 'exercise' ? 'duration' : 'hours']: this.healthForm.value.value
        }
      };
      this.healthService.logHealthMetric(metric).subscribe({
        next: () => {
          this.healthForm.reset();
          this.metricLogged.emit();
        },
        error: (err) => console.error('Error logging metric:', err)
      });
    }
  }
}