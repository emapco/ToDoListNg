import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";

import {LoginModule} from "../login/login.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './siderbar/sidebar.component';
import { MainSidebarComponent } from './siderbar/main-sidebar/main-sidebar.component';
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainSidebarComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    LoginModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainSidebarComponent
  ],
})
export class MainUIModule { }
