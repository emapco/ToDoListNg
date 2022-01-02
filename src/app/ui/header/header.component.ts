import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() lightMode!: boolean;
  @Output() lightModeToggled = new EventEmitter();
  @Output() menuToggled = new EventEmitter();

  constructor() {}

  toggleMode() {
    this.lightMode = !this.lightMode;
    this.lightModeToggled.emit(this.lightMode);
  }
}
