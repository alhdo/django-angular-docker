import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild, CanLoad {
  canActive$ = true;
  activeSubscription$ =  true;
  constructor(private store: Store<{user, accessToken}>,
              private router: Router) {
    // @ts-ignore
    this.store.select('auth').subscribe(state => {
      console.log('user', state);
      // @ts-ignore
      this.canActive$ = state.accessToken !== null;

      try {
        // @ts-ignore
        this.activeSubscription$ = state.user.activeSubscription;
      }catch (e) {

      }
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.canActive$) {
      this.router.navigate(['/auth/login']);
    }
    // if (!this.activeSubscription$) {
    //   this.router.navigate(['/home']);
    // }
    return this.canActive$;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
