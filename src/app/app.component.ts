import {Component, OnDestroy} from '@angular/core';
import {SidebarService} from "./shared/sidebar.service";
import {LoginService} from "./shared/login.service";
import {Subscription} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarService, LoginService]
})
export class AppComponent implements OnDestroy{
  title = 'ToDoListNg';
  showLogin: boolean = false;
  subscription: Subscription;
  constructor(public sidebarServ: SidebarService,
              public loginServ: LoginService,
              public auth: AuthService) {
    this.showLogin = !this.loginServ.isLoggedIn;  // show if not logged in
    // subscription for login
    this.subscription = loginServ.loginAnnounced$.subscribe(
      isLoggedIn => {
        this.showLogin = !isLoggedIn;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formatContent() {
    return {'margin-left':
        (this.sidebarServ.enableSidebar) ? this.sidebarServ.sidebarWidth : '0'}
  }
}
