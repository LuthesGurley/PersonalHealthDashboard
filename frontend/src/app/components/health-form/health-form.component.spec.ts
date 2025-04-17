// frontend/src/app/components/health-form/health-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthFormComponent } from './health-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HealthService } from '../../services/health.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HealthFormComponent', () => {
  let component: HealthFormComponent;
  let fixture: ComponentFixture<HealthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HealthFormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [HealthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.healthForm.valid).toBeFalsy();
  });
});