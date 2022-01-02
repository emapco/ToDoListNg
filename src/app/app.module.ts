import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {UiModule} from "./ui/ui.module";
import {PagesModule} from "./pages/pages.module";
import {AuthorizationModule} from "./authorization/authorization.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UiModule,
    PagesModule,
    SharedModule,
    CoreModule,
    AuthorizationModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
