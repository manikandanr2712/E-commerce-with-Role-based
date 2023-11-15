import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
        withCredentials: true, // Include credentials (e.g., cookies)
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        // Handle errors here
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Handle 401 Unauthorized errors (e.g., token expiration)
          // You can add your logic here
        }
        return throwError(() => error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
