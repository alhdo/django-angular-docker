import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {select, Store} from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken: string = null;
  constructor(private store: Store<any>) {
    store.pipe(select('auth')).subscribe((state) => {
      this.authToken = state.accessToken;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    if (this.authToken === null) {
      return next.handle(req);
    }

    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + this.authToken } });
    return next.handle(authReq);
  }
}
