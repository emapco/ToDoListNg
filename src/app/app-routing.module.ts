import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {TaskListComponent} from "./pages/task/list/task-list.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {LoginComponent} from "./pages/login/login/login.component";
import {SignupComponent} from "./pages/login/signup/signup.component";
import {LogoutComponent} from "./pages/login/logout/logout.component";

const routes: Routes = [  // const for defining routes
  {
    path: '',
    component: WelcomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: SignupComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
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
