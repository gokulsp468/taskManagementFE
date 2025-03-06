import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  
  const http = inject(HttpClient);
  const authService = inject(AuthService);
  const router = inject(Router);

  let accessToken = authService.isSessionActive() || '';
  let refreshToken = localStorage.getItem('refreshToken') || '';

  const isTokenRefreshRequest = req.url.includes('/auth/refresh-token/');

  const modifiedReq = req.clone({
    setHeaders: isTokenRefreshRequest ? {} : { Authorization: `Bearer ${accessToken}` }
  });

  return next(modifiedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // const rememberMe = localStorage.getItem('rememberMe');

      if (err.status === 401 ) {
        authService.logout();
        router.navigate(['/signin']);
        return throwError(() => err);
      }

      
      if (err.status === 401 && !isTokenRefreshRequest) {
        // Attempt to refresh token
        return http.post(`${environment.apiHost}/auth/refresh-token/`, {}, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${refreshToken}` }
        }).pipe(
          switchMap((res: any) => {
            // Save new token
            accessToken = res.data.access_tokenz;
            localStorage.setItem('accesstoken', accessToken);

            // Retry the original request with the new token
            return next(req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }));
          }),
          catchError((innerErr: HttpErrorResponse) => {
            return throwError(() => innerErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
