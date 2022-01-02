import {Component} from '@angular/core';
import {AuthorizationService} from "./authorization/authorization.service";
import {CookiesService} from "./core/cookies.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ToDoListNg';
  lightMode: boolean = false;

  constructor(public authorization: AuthorizationService,
              private cookieService: CookiesService) {
    this.authorization.authenticate().then();
    this.lightMode = this.cookieService.getMode();
  }

  lightModeToggled(status: boolean) {
    this.lightMode = status;
    this.cookieService.setMode(this.lightMode);
  }
}
