import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';


export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('login') && !req.url.includes('client/create') && !req.url.includes("view")) {
    let authenticationService: AuthenticationService = inject(AuthenticationService);
    let token = authenticationService.getAuthenticationToken();
    if (!token) {
      return next(req);
    }
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next(request);
  }
  return next(req);
};
