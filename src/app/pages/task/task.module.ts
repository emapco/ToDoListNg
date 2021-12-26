import { NgModule } from '@angular/core';

import { RemoveTaskComponent } from './remove-task/remove-task.component';
import {SharedModule} from "../../shared/shared.module";
import {TaskListComponent} from "./list/task-list.component";
import {TaskDetailComponent} from "./detail/task-detail.component";
import { AddTaskComponent } from './add-task/add-task.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    AddTaskComponent,
    RemoveTaskComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent,
    AddTaskComponent,
    RemoveTaskComponent,
  ],
  providers: [],
})
export class TaskModule { }
