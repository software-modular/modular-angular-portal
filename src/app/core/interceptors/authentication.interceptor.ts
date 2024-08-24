import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';


export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let allowUrls: string[] = ["login", "client/create", "/projects/view/"];
  de
  for (let url of allowUrls) {
    if (!req.url.includes(url)) {
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
  }

  return next(req);
};

