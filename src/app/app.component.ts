import {Component} from '@angular/core';
import {AuthorizationService} from "./authorization/authorization.service";
import {CookiesService} from "./core/cookies.service";
import {OverlayContainer} from "@angular/cdk/overlay";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ToDoListNg';
  isLightMode: boolean = false;
  isSidebarOpen: boolean = true;

  constructor(public authorization: AuthorizationService,
              private cookieService: CookiesService,
              private overlayContainer: OverlayContainer) {
    this.authorization.authenticate().then();
    // call toggled in order to set overlay theme
    this.lightModeToggled(this.cookieService.getDisplayMode()).then();
    this.isSidebarOpen = this.cookieService.getSidebarMode();
  }

  async lightModeToggled(status: boolean) {
    this.isLightMode = status;
    this.cookieService.setDisplayMode(this.isLightMode);
    // set overlay component (MatDialog) theme
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    if (this.isLightMode) {
      overlayContainerClasses.remove('dark-theme');
      overlayContainerClasses.add('light-theme');
    } else {
      overlayContainerClasses.remove('light-theme');
      overlayContainerClasses.add('dark-theme');
    }
  }

  async sidebarToggled() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.cookieService.setSidebarMode(this.isSidebarOpen);
  }
}
