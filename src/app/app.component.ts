import {Component, OnDestroy} from '@angular/core';
import {SidebarService} from "./shared/sidebar.service";
import {LoginService} from "./shared/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarService, LoginService]
})
export class AppComponent implements OnDestroy{
  title = 'ToDoListNg';
  showLogin: boolean;
  subscription: Subscription;
  constructor(private _sidebarServ: SidebarService, private _loginServ: LoginService) {
    this.showLogin = !this._loginServ.isLoggedIn;  // show if not logged in
    // subscription for login
    this.subscription = _loginServ.loginAnnounced$.subscribe(
      isLoggedIn => {
        console.log(isLoggedIn)
        this.showLogin = !isLoggedIn;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get sidebarServ(): SidebarService {
    return this._sidebarServ;
  }

  formatContent() {
    return {'margin-left':
        (this.sidebarServ.enableSidebar) ? this.sidebarServ.sidebarWidth : '0'}
  }
}
