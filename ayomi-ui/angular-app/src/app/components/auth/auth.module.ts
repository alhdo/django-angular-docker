import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthLayoutComponent} from '../layouts/auth-layout/auth-layout.component';
import {AuthGuard} from '../../guards/auth.guard';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    empty: true,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        default: true
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent]
  ,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
