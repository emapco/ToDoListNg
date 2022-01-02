import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookie: CookieService) { }

  setMode(isLightMode: boolean): void {
    this.cookie.set('isLightMode', String(isLightMode));
  }

  getMode(): boolean {
    return (this.cookie.get('isLightMode') === 'true');
  }
}
