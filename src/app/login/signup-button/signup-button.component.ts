import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-signup-button',
  templateUrl: './signup-button.component.html',
  styleUrls: ['../login.css']
})
export class SignupButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  signupWithRedirect(): void {
    this.auth.loginWithPopup({
      screen_hint: 'signup'
    });
  }
}
