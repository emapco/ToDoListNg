import {AfterViewInit, Component} from '@angular/core';
import {AuthorizationService} from "../../authorization/authorization.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {

  }
}
