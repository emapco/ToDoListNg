import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProfileComponent} from "./profile/profile.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {TaskModule} from "../task/task.module";



@NgModule({
  declarations: [
    PageNotFoundComponent,
    ProfileComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    TaskModule
  ],
  exports: [
    PageNotFoundComponent,
    ProfileComponent,
    WelcomePageComponent
  ]
})
export class PagesModule { }
