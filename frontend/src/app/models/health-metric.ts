export interface HealthMetric {
    type: 'diet' | 'exercise' | 'sleep' | 'vitals';
    value: any;
    date?: string;
  }