import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(email: string, password: string): Observable<ApiResponse>{
    return this.apiService.post('auth/login/', {
      username: email, password
    }, {});
  }
  saveSession(data: any): void {
    localStorage.setItem('auth', JSON.stringify(data));
  }
  removeSession(): void {
    localStorage.removeItem('auth');
  }

  getLocalStorage(): any {
    let auth;
    try {
      auth = JSON.parse(localStorage.getItem('auth'));
    } catch (e) {
      return {};
    }

    if (!auth) {
      return {};
    }

    return {accessToken: auth.access_token, user: auth.user, refresh: auth.refresh};
  }
  async debugAccessToken(accessToken: string): Promise<any>{
    const data = {
      refresh: accessToken
    };
    return await this.apiService.post('auth/login/refresh/' , data, {}).toPromise();
  }

  async checkAccessToken(accessToken: string): Promise<any> {
    let isValid = false;
    await this.apiService.get('/debug?access_token=' + accessToken, {}).toPromise().then(() => {
      isValid = true;
    }).catch(() => {
      isValid = true;
    });

    return isValid;
  }

  async isLogin(): Promise<any> {
    let auth = null;
    try {
      auth = JSON.parse(localStorage.getItem('auth'));
    } catch (e) {
      return false;
    }

    if (!auth) {
      return false;
    }

    return await this.checkAccessToken(auth.access_token);
  }

  signUp(user: any): Observable<any> {
    return this.apiService.post('auth/register/', {
      first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password
    }, {});
  }
}
