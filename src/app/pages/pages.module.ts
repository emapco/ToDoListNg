import { NgModule } from '@angular/core';

import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {TaskModule} from "./task/task.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PageNotFoundComponent,
    WelcomePageComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    PageNotFoundComponent,
    WelcomePageComponent,
    TaskModule,
  ],
})
export class PagesModule { }
