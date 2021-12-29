import { NgModule } from '@angular/core';
import {BackendService} from "./backend.service";
import {SidebarService} from "./sidebar.service";
import { CookieService } from 'ngx-cookie-service';
import {ApiService} from "./api.service";



@NgModule({
  providers: [
    BackendService,
    SidebarService,
    CookieService,
    ApiService,
  ]
})
export class CoreModule {}
