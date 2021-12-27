import {AfterViewInit, Component} from '@angular/core';
import {SidebarService} from "../../core/sidebar.service";
import {AuthorizationService} from "../../authorization/authorization.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  constructor(public sidebarServ: SidebarService) {}

  ngAfterViewInit() {
    let element = document.getElementById('container');
    if (element) {
      this.sidebarServ.sidebarWidth = getComputedStyle(element).getPropertyValue('width');
    }
  }
}
