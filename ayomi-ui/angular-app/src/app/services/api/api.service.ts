import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import _snakeCase from 'lodash/snakeCase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base = environment.API_URL;
  constructor(private http: HttpClient) { }


  // tslint:disable-next-line:typedef
  buildUrl(endpoint: any) {
    return this.base + endpoint;
  }

  get(endppoint: any, options: any): any {
    return this.http.get(this.buildUrl(endppoint), options);
  }

  post(endpoint: any, postData: any, options: any): any {
    for (const fieldName in postData) {
      const snakeCase = _snakeCase(fieldName);
      if (snakeCase === fieldName) {
        continue;
      }
      postData[snakeCase] = postData[fieldName];
      delete postData[fieldName];
    }

    return this.http.post(this.buildUrl(endpoint), postData, options);
  }
  put(endpoint: any, postData: any, options: any): any {
    for (const fieldName in postData) {
      const snakeCase = _snakeCase(fieldName);
      if (snakeCase === fieldName) {
        continue;
      }
      postData[snakeCase] = postData[fieldName];
      delete postData[fieldName];
    }

    return this.http.put(this.buildUrl(endpoint), postData, options);
  }
}
