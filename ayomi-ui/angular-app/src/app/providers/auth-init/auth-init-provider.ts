import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {authInit} from '../../actions/login.actions';

@Injectable()
export class AuthInitProvider {
  constructor(private authService: AuthService,
              private store: Store<{user, accessToken}>) { }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getLocalStorage();
      const localAuth = this.authService.getLocalStorage();
      console.log('localstorage', localAuth);
      this.authService.debugAccessToken(localAuth.user?.refresh).then((response) => {
        // @ts-ignore
        const authData = response;
        console.log('Init provider', authData);
        this.store.dispatch(authInit({user: localAuth.user, accessToken: response.access, refresh: localAuth.refresh}));
        this.authService.saveSession({
          user: localAuth.user,
          accessToken: authData.access,
          refresh: localAuth.refresh
        });

      }).catch(() => {
        // just ignore
      }).finally(() => {
        resolve(true);
      });
    });
  }
}
