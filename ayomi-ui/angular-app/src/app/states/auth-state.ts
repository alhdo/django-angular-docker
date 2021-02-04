import {User} from '../models/User';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  public user: User;
  public accessToken: string;
  public refresh: string;
}
