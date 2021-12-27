import { NgModule } from '@angular/core';
import {AuthorizationService} from "./authorization.service";
import {AuthGuard} from "./auth-guard.component";



@NgModule({
  declarations: [AuthGuard],
  providers: [
    AuthorizationService, AuthGuard
  ]
})
export class AuthorizationModule { }
