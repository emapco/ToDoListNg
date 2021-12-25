import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {TaskListComponent} from "./task/list/task-list.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {AuthGuard, AuthService} from "@auth0/auth0-angular";

const routes: Routes = [  // const for defining routes
  { path: '',
    component: WelcomePageComponent,
    pathMatch: 'full',
  },
  { path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
