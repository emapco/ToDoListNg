import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-auth-sidebar-nav',
  templateUrl: './auth-sidebar-nav.component.html'
})
export class AuthSidebarNavComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
}
