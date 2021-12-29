import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import jwt_decode from 'jwt-decode';

const login_url: string = 'https://todolistng.auth.us-east-1.amazoncognito.com/' +
  'login?client_id=6b4oshakbeu9tl76j2b0p9e8ds&response_type=token&scope=email+openid' +
  '&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Ftasks';
const logout_url: string = 'https://todolistng.auth.us-east-1.amazoncognito.com/' +
  'logout?client_id=6b4oshakbeu9tl76j2b0p9e8ds&response_type=token' +
  '&logout_uri=http%3A%2F%2Flocalhost%3A4200%2F';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _isAuthenticated: boolean = false;
  private _access_token: string = '';
  private _id_token: string = '';

  constructor(@Inject(DOCUMENT) private document: Document,
              private cookie: CookieService) { }

  /**
   * Gets tokens if recently logged in and stores them in cookies
   * Then calls method to authenticate tokens and retrieve the user's email
   * Sets isAuthenticated member variable if tokens are valid
   */
  async authenticate(): Promise<void> {
    this._access_token = this.cookie.get('accessTokenCookie');
    this._id_token = this.cookie.get('idTokenCookie');

    if (!this._access_token || !this._id_token) {
      let window = this.document.defaultView;
      if (window) {
        let link = window.location.href;
        // extract the different tokens after logging in
        this._access_token = AuthorizationService._getTokenFromUrl(link, '&access_token=');
        this._id_token = AuthorizationService._getTokenFromUrl(link, '#id_token=');
      }
      let options = {expires: 1, secure: true, sameSite: 'Strict'} as const;
      this.cookie.set('accessTokenCookie', this._access_token, options);
      this.cookie.set('idTokenCookie', this._id_token, options);
    }

    if (this._access_token && this._id_token) {
      this._isAuthenticated = await this.verifyTokens();
    }
  }

  /**
   * Verifies tokens are still valid.
   * If it fails then the user is logged out.
   */
  async verifyTokens(): Promise<boolean> {
    let status: boolean = false;
    try {
      let accessDecodedToken = this.decodeToken(this._access_token);
      let idDecodedToken = this.decodeToken(this._id_token);
      let time = Math.round(new Date().getTime()/1000);
      if (accessDecodedToken.exp < time || idDecodedToken.exp < time) {
        throw new Error("Token not valid!");
      }
      status = true;
    } catch {
      this.logout();
    }
    return status;
  }

  /**
   * Decodes and returns the given token
   * @param token
   */
  decodeToken(token: string): any {
    let obj;
    try {
      obj = jwt_decode(token);
    }
    catch {
      obj = '';
    }
    return obj;
  }

  /**
   * Uses regex to extract tokens from parameter link using the parameter prefix.
   * Formats and returns the extracted token.
   * @param link
   * @param prefix
   * @private
   */
  private static _getTokenFromUrl(link: string, prefix: string): string {
    let str: string = '';
    let regex_output = new RegExp(`${prefix}.+?&`).exec(link);
    // remove the prefix and trailing &
    if (regex_output) {
      str = regex_output[0].replace(prefix, '').slice(0, -1);
    }
    return str;
  }

  /**
   * Directs user to login screen on AWS Cognito
   */
  login(): void {
    this.document.location.href = login_url;
  }

  /**
   * Logs out user from AWS Cognito and clears the cookies
   */
  logout(): void {
    this.cookie.deleteAll();
    this.document.location.href = logout_url;
  }

  /**
   * Gets username from decoded access token
   */
  get username(): string {
    return this.decodeToken(this._access_token).username;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get id_token(): string {
    return this._id_token;
  }

  set id_token(value: string) {
    this._id_token = value;
  }
}
