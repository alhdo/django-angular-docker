import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../states/auth-state';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import { login } from 'src/app/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isProcessing = false;
  isError = false;
  constructor(private store: Store<{ auth: AuthState}>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('init');
  }
  login(form): void {
    this.isProcessing = true;

    this.authService.login(form.email, form.password).subscribe((data: any) => {
      const authData = {
        accessToken: data.access,
        refresh: data.refresh,
        user: data
      };
      console.log('login', authData);
      // this.notyService.success('Sign in successfully !');
      this.authService.saveSession(authData);
      // @ts-ignore
      this.store.dispatch(login({ user : authData, accessToken: authData.accessToken, refresh: authData.refresh}));
      this.router.navigate(['/home']);
    }, (error) => {
      // this.notyService.error(error);
      this.isError = true;
      this.isProcessing = false;
    });
  }

}
