import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Request intercepted before sending to server!');
    const modifiedReq = request.clone({
      headers: request.headers.append('Auth', 'false'),
    });
    return next.handle(modifiedReq);
  }
}
