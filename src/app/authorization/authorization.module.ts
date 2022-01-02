import { NgModule } from '@angular/core';
import {AuthorizationService} from "./authorization.service";
import {AuthGuard} from "./auth.guard";

@NgModule({
  providers: [
    AuthorizationService, AuthGuard
  ]
})
export class AuthorizationModule { }
