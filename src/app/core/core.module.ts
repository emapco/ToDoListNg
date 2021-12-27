import { NgModule } from '@angular/core';
import {BackendService} from "./backend.service";
import {SidebarService} from "./sidebar.service";
import {TaskService} from "./task.service";
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  providers: [
    BackendService,
    SidebarService,
    TaskService,
    CookieService,
  ]
})
export class CoreModule {}
