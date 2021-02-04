import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '../../services/loader/loader.service';

@Injectable()
export class RequestObserver implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    this.loaderService.newConnection();
    return next.handle(req).pipe(finalize(() => {
      this.loaderService.endConnection();
    }));
  }
}
