import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./core/sidebar.service";
import {AuthorizationService} from "./authorization/authorization.service";
import {BackendService} from "./core/backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ToDoListNg';
  constructor(public sidebarServ: SidebarService,
              public authorization: AuthorizationService) {
  }

  ngOnInit() {
    this.authorization.authenticate().then();
  }

  formatContent() {
    return {'margin-left':
        (this.sidebarServ.enableSidebar) ? this.sidebarServ.sidebarWidth : '0'}
  }
}
