import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProfileComponent} from "./profile/profile.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {ApiComponent} from "./api/api.component";



@NgModule({
  declarations: [
    PageNotFoundComponent,
    ProfileComponent,
    WelcomePageComponent,
    ApiComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageNotFoundComponent,
    ProfileComponent,
    WelcomePageComponent,
    ApiComponent
  ]
})
export class PagesModule { }
