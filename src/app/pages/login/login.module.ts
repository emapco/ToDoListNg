import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {SignupComponent} from "./signup/signup.component";



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [],
})
export class LoginModule { }
