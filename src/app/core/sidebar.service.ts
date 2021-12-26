import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _enableSidebar: boolean = true;
  private _sidebarWidth: string = '';

  constructor() { }

  toggleSidebar() {
    this._enableSidebar = !this._enableSidebar;
  }

  get enableSidebar(): boolean {
    return this._enableSidebar;
  }

  get sidebarWidth(): string {
    return this._sidebarWidth;
  }

  set sidebarWidth(value: string) {
    this._sidebarWidth = value;
  }
}
