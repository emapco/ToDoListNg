import { NgModule } from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './siderbar/sidebar.component';
import { MainSidebarComponent } from './siderbar/main-sidebar/main-sidebar.component';
import {AuthSidebarComponent} from "./siderbar/auth-sidebar/auth-sidebar.component";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainSidebarComponent,
    AuthSidebarComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainSidebarComponent,
    AuthSidebarComponent,
  ],
})
export class UiModule { }
