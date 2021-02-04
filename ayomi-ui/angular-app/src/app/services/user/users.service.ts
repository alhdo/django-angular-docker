import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  getProfile(): any {
    return this.apiService.get('auth/profile/', {});
  }

  updateProfile(user: any): any {
    return this.apiService.put(`auth/update_profile/${user.id}/`, user, {});
  }
}
