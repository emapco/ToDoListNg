import {Component} from '@angular/core';
import {BackendService} from "../../core/backend.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {

  constructor(private backend: BackendService) {
  }
}
