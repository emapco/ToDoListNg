import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../../authorization/authorization.service";


@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css'],
})
export class AuthSidebarComponent implements OnInit {

  constructor(public authService: AuthorizationService) { }

  ngOnInit(): void {
  }
}
