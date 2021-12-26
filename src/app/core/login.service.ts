import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isAuthenticated: boolean = false;
  constructor() { }
}
