import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../../authorization/authorization.service";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(public authorization: AuthorizationService) { }

  ngOnInit(): void {
  }

}
