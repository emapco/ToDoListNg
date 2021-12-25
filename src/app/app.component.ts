import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./shared/sidebar.service";
import {LoginService} from "./shared/login.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarService, LoginService]
})
export class AppComponent implements OnInit {
  title = 'ToDoListNg';
  showLogin: boolean = false;
  constructor(public sidebarServ: SidebarService,
              public loginServ: LoginService,
              public auth: AuthService) {
    this.showLogin = !this.loginServ.isLoggedIn;
  }

  ngOnInit() {

  }

  formatContent() {
    return {'margin-left':
        (this.sidebarServ.enableSidebar) ? this.sidebarServ.sidebarWidth : '0'}
  }
}
