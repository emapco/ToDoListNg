import { NgModule } from '@angular/core';
import {BackendService} from "./backend.service";
import {LoginService} from "./login.service";
import {SidebarService} from "./sidebar.service";
import {TaskService} from "./task.service";



@NgModule({
  providers: [
    BackendService,
    SidebarService,
    LoginService,
    TaskService,
  ]
})
export class CoreModule {}
