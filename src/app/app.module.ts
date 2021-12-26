import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {MainUIModule} from "./main-ui/main-u-i.module";
import {PagesModule} from "./pages/pages.module";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MainUIModule,
    PagesModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
