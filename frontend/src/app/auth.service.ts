import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 
  constructor(private http: HttpClient) {}

  signup(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/signup`, credentials).pipe(
      tap(res => {
        console.log('Signup response:', res); // Debug
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
      })
    );
  }

  signin(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(res => {
        console.log('Signin response:', res); // Debug
        if (res.access_token) {
          localStorage.setItem('token', res.access_token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}