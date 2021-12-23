import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLoggedIn: boolean = false;
  // observable login sources
  private _loginAnnouncedSource = new Subject<boolean>();
  private _loginConfirmedSource = new Subject<boolean>();
  // observable login stream
  loginAnnounced$ = this._loginAnnouncedSource.asObservable();
  loginConfirmed = this._loginConfirmedSource.asObservable();

  constructor() { }

  login() {
    this._isLoggedIn = true;
    this.announceLogin(this._isLoggedIn);
  }

  announceLogin(isLoggedIn: boolean) {
    this._loginAnnouncedSource.next(isLoggedIn);
  }

  confirmLogin(isLoggedIn: boolean) {
    this._loginConfirmedSource.next(isLoggedIn);
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }
}
