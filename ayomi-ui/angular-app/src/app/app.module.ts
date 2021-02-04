import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import * as LoginReducer from './reducers/login.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SettingProvider} from './providers/settings/setting-provider';
import {AuthInitProvider} from './providers/auth-init/auth-init-provider';
import {AuthState} from './states/auth-state';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestObserver} from './providers/http-interceptors/request-observer';
import {StoreModule} from '@ngrx/store';
import {AuthModule} from './components/auth/auth.module';
import {LayoutsModule} from './components/layouts/layouts.module';
import {ProfileModule} from './components/profile/profile.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// tslint:disable-next-line:typedef
export function AuthInitProviderFactory(authInitProvider: AuthInitProvider) {
  return () => authInitProvider.load();
}
// tslint:disable-next-line:typedef
export function SettingProviderFactory(settingProvider: SettingProvider) {
  return () => settingProvider.load();
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({auth: LoginReducer.reducer}),
    AuthModule,
    LayoutsModule,
    ProfileModule,
    NgbModule
  ],
  providers: [
    SettingProvider,
    AuthInitProvider,
    AuthState,
    {provide: APP_INITIALIZER, useFactory: AuthInitProviderFactory, deps: [AuthInitProvider], multi: true},
    {provide: APP_INITIALIZER, useFactory: SettingProviderFactory, deps: [SettingProvider], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RequestObserver, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
