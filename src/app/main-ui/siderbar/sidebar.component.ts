import {AfterViewInit, Component} from '@angular/core';
import {SidebarService} from "../../shared/sidebar.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  constructor(public sidebarServ: SidebarService, public auth: AuthService) {}

  ngAfterViewInit() {
    let element = document.getElementById('container');
    if (element) {
      this.sidebarServ.sidebarWidth = getComputedStyle(element).getPropertyValue('width');
    }
  }
}
