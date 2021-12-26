import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./core/sidebar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SidebarService]
})
export class AppComponent implements OnInit {
  title = 'ToDoListNg';
  constructor(public sidebarServ: SidebarService) {
  }

  ngOnInit() {

  }

  formatContent() {
    return {'margin-left':
        (this.sidebarServ.enableSidebar) ? this.sidebarServ.sidebarWidth : '0'}
  }
}
