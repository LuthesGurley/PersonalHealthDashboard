import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <mat-card-title>Sign Up</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="email">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput type="password" [(ngModel)]="password">
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="signup()">Sign Up</button>
        <button mat-button routerLink="/signin">Sign In</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .card { max-width: 400px; margin: 2rem auto; padding: 1rem; }
    mat-form-field { width: 100%; margin-bottom: 1rem; }
  `]
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => alert('Registration failed')
    });
  }
}