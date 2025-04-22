export interface HealthMetric {
  _id: string; 
  type: 'diet' | 'exercise' | 'sleep' | 'vitals';
  value: any;
  date?: string;
}