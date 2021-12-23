import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {TaskModule} from "./task/task.module";
import {MainUIModule} from "./main-ui/main-u-i.module";
import {BackendService} from "./backend.service";
import {TaskService} from "./task/task.service";
import {SidebarService} from "./shared/sidebar.service";
import {LoginModule} from "./login/login.module";
import {LoginService} from "./shared/login.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        TaskModule,
        MainUIModule,
        BrowserAnimationsModule,
        LoginModule
    ],
  providers: [BackendService, TaskService, SidebarService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
