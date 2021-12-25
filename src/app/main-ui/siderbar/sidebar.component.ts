import {AfterViewInit, Component} from '@angular/core';
import {SidebarService} from "../../shared/sidebar.service";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-siderbar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  constructor(public sidebarServ: SidebarService, public auth: AuthService) {}

  ngAfterViewInit() {
    let element = document.getElementById('content');
    if (element) {
      this.sidebarServ.sidebarWidth = getComputedStyle(element).getPropertyValue('width');
    }
  }
}
