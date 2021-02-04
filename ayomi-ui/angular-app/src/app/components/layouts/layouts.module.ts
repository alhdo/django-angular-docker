import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [AuthLayoutComponent, CommonLayoutComponent, HeaderComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class LayoutsModule { }
