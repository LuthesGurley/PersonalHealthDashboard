import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar class="header">
        <span>Health Dashboard</span>
      </mat-toolbar>
      <div class="main-content">
        <mat-nav-list class="sidebar">
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
        </mat-nav-list>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
      <mat-toolbar class="footer">
        <span>© {{currentYear}} Health Dashboard. All rights reserved.</span>
      </mat-toolbar>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      margin: 0;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0;
    }

    .header {
      justify-content: center;
      background-color: #1976d2;
      color: white;
      padding: 0 16px;
      min-height: 64px;
    }

    .main-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .sidebar {
      width: 200px;
      background-color: #263238;
      color: white;
      height: 100%;
      padding: 16px 0;
    }

    .sidebar a {
      color: white;
    }

    .sidebar .active {
      background-color: #37474f;
    }

    .content-wrapper {
      flex: 1;
      background-color: #f5f5f5;
      overflow: auto;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      height: 100%;
    }

    .footer {
      justify-content: center;
      background-color: #455a64;
      color: white;
      padding: 0 16px;
      min-height: 48px;
    }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}