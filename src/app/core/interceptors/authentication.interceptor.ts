import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { catchError, finalize, switchMap, throwError } from 'rxjs';


export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let loadingSpinnerService: LoadingSpinnerService = inject(LoadingSpinnerService);
  let authenticationService: AuthenticationService = inject(AuthenticationService);
  loadingSpinnerService.showSpinner(true);
  if (!req.url.includes('login') && !req.url.includes('client/create') && !req.url.includes("view")) {
    let token = authenticationService.getAuthenticationToken();
    if (!token) {
      return next(req);
    }
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    return next(request).pipe(
      finalize(() => loadingSpinnerService.showSpinner(false))
    );
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return authenticationService.refreshAccessToken().pipe(
          switchMap((newAccessToken) => {
            if (newAccessToken) {
              const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${newAccessToken}` } });
              return next(newReq);
            }
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    }),
    finalize(() => loadingSpinnerService.showSpinner(false)));
};
