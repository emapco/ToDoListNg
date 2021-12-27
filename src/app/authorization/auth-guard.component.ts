import { Component } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {AuthorizationService} from "./authorization.service";

@Component({
  selector: 'app-auth-guard',
  template: ''
})
export class AuthGuard implements CanActivate, CanDeactivate<any> {

  constructor(public authorization: AuthorizationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.authorization.isAuthenticated;
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    return this.authorization.isAuthenticated;
  }
}
