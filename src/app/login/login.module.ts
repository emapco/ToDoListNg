import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {LoginService} from "../shared/login.service";
import {LoginButtonComponent} from "./login-button/login-button.component";
import {LogoutButtonComponent} from "./logout-button/logout-button.component";
import {SignupButtonComponent} from "./signup-button/signup-button.component";
import {AuthenticationButtonComponent} from "./authentication-button/authentication-button.component";


@NgModule({
  declarations: [
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    AuthenticationButtonComponent
  ],
  exports: [
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    AuthenticationButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
