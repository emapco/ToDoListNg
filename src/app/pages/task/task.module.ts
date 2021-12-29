import { NgModule } from '@angular/core';

import { DeleteTaskComponent } from './delete-task/delete-task.component';
import {SharedModule} from "../../shared/shared.module";
import {TaskListComponent} from "./list/task-list.component";
import {TaskDetailComponent} from "./detail/task-detail.component";
import { AddTaskComponent } from './add-task/add-task.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    AddTaskComponent,
    DeleteTaskComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent,
    AddTaskComponent,
    DeleteTaskComponent,
  ],
  providers: [],
})
export class TaskModule { }
