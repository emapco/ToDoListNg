import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../shared/login.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['../login.css']
})
export class LoginButtonComponent implements OnInit {
  constructor(private _loginServ: LoginService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup({
      screen_hint: 'signup',
    });
  }
}
