import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";
import {TaskListComponent} from "../pages/task/list/task-list.component";
import {PageNotFoundComponent} from "../pages/page-not-found/page-not-found.component";
import {WelcomePageComponent} from "../pages/welcome-page/welcome-page.component";
import {AuthGuard} from "../authorization/auth.guard";

const routes: Routes = [  // const for defining routes
  {
    path: '',
    component: WelcomePageComponent,
    pathMatch: 'full',
    canDeactivate: [AuthGuard]
  },
  {
    path: '',
    component: TaskListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: WelcomePageComponent,
    canDeactivate: [AuthGuard],
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
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
