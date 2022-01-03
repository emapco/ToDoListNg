import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookie: CookieService) { }

  setDisplayMode(isLightMode: boolean ): void {

    this.cookie.set('isLightMode', String(isLightMode));
  }

  getDisplayMode(): boolean {
    return (this.cookie.get('isLightMode') === 'true');
  }

  setSidebarMode(isSidebarOpen: boolean): void {
    this.cookie.set('isSidebarOpen', String(isSidebarOpen));
  }

  getSidebarMode(): boolean {
    return (this.cookie.get('isSidebarOpen') === 'true');
  }
}
