import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {CommonLayoutComponent} from '../layouts/common-layout/common-layout.component';
import {UserGuard} from '../../guards/user.guard';
import {RouterModule} from '@angular/router';
import {LayoutsModule} from '../layouts/layouts.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../providers/http-interceptors/auth-interceptor';
import { EditprofileComponent } from './editprofile/editprofile.component';


const routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        default: true
      },
      {
        path: 'home',
        component: HomeComponent,
      }
    ]
  }
];
@NgModule({
  declarations: [HomeComponent, EditprofileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutsModule,
    FormsModule
  ],
  providers: [
    UserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileModule { }
