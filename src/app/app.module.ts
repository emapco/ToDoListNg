import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {TaskModule} from "./pages/task/task.module";
import {MainUIModule} from "./main-ui/main-u-i.module";
import {PagesModule} from "./pages/pages.module";
import {AppRoutingModule} from "./app-routing.module";
import {BackendService} from "./backend.service";
import {TaskService} from "./pages/task/task.service";
import {SidebarService} from "./shared/sidebar.service";
import {LoginModule} from "./login/login.module";

import { environment as env } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthHttpInterceptor } from "@auth0/auth0-angular";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    TaskModule,
    MainUIModule,
    LoginModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`${env.dev.serverUrl}/api/messages/protected-message`],
      }
    }),
  ],
  providers: [
    BackendService, TaskService, SidebarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
