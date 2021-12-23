import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../shared/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = 'tom'
  password = ''
  constructor(private _loginServ: LoginService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this._loginServ.login();
  }
}
