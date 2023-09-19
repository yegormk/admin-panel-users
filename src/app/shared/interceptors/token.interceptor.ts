import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
  ) {}

  intercept<T, U>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<U>> {
    const token = this.localStorageService.getData('Authorization');
    if (token) {
      const processedReq = this.addToken(req, token);
      return next.handle(processedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.localStorageService.clearData();
            this.router.navigateByUrl('auth/login');
          }
          return throwError(error);
        }),
      );
    }
    return next.handle(req);
  }

  addToken<T>(request: HttpRequest<T>, token: string): HttpRequest<T> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
