import { NgModule } from '@angular/core';

import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProfileComponent} from "./profile/profile.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {TaskModule} from "./task/task.module";
import {LoginModule} from "./login/login.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PageNotFoundComponent,
    ProfileComponent,
    WelcomePageComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    PageNotFoundComponent,
    ProfileComponent,
    WelcomePageComponent,
    TaskModule,
    LoginModule,
  ],
})
export class PagesModule { }
