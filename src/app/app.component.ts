import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./shared/sidebar.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarService]
})
export class AppComponent implements OnInit {
  title = 'ToDoListNg';
  constructor(public sidebarServ: SidebarService,
              public auth: AuthService) {
  }

  ngOnInit() {

  }

  formatContent() {
    return {'margin-left':
        (this.sidebarServ.enableSidebar) ? this.sidebarServ.sidebarWidth : '0'}
  }
}
