import {AfterViewInit, Component} from '@angular/core';
import {SidebarService} from "../../shared/sidebar.service";

@Component({
  selector: 'app-siderbar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  constructor(private _sidebarServ: SidebarService) {}

  ngAfterViewInit() {
    let element = document.getElementById('content');
    if (element) {
      this._sidebarServ.sidebarWidth = getComputedStyle(element).getPropertyValue('width');
    }
  }

  get sidebarServ(): SidebarService {
    return this._sidebarServ;
  }
}
