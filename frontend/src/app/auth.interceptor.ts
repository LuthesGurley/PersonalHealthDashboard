import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor called for request:', req.url);
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    console.log('Token found:', token);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  console.log('No token found, passing original request');
  return next(req);
};