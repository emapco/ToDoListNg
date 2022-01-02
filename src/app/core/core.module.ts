import { NgModule } from '@angular/core';
import {BackendService} from "./backend.service";
import { CookieService } from 'ngx-cookie-service';
import {ApiService} from "./api.service";
import {CookiesService} from "./cookies.service";



@NgModule({
  providers: [
    BackendService,
    CookieService,
    CookiesService,
    ApiService,
  ]
})
export class CoreModule {}
