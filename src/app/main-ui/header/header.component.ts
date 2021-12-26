import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../../core/sidebar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _sidebarServ: SidebarService) { }

  ngOnInit(): void {
  }

  get sidebarServ(): SidebarService {
    return this._sidebarServ;
  }

  set sidebarServ(value: SidebarService) {
    this._sidebarServ = value;
  }
}
