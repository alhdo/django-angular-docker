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
export class AuthGuard implements CanActivate{

  canActive$ = true;

  constructor(private store: Store<{user, accessToken}>,
              private router: Router) {
    // @ts-ignore
    this.store.select('auth').subscribe(state => {
      // @ts-ignore
      this.canActive$ = state.accessToken === null;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.canActive$) {
      this.router.navigate(['/home']);
    }
    return this.canActive$;
  }
}
