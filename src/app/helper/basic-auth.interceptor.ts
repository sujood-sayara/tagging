import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '.././services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('api/user')) {
      const user = JSON.parse(localStorage.getItem('jwt')).jwt.toString();
      const isLoggedIn = user;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: {
            jwt: `${user}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
