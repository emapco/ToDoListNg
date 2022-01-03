import {NgModule} from '@angular/core';

import {DeleteTaskComponent} from './delete-task/delete-task.component';
import {SharedModule} from "../../shared/shared.module";
import {TaskListComponent} from "./list/task-list.component";
import {TaskDetailComponent} from "./detail/task-detail.component";
import {AddTaskComponent} from './add-task/add-task.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";


@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    AddTaskComponent,
    DeleteTaskComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent,
    AddTaskComponent,
    DeleteTaskComponent,
  ],
providers: [
  MatDialog,
  { provide: MatDialogRef, useValue: {} },
  {provide: MAT_DIALOG_DATA, useValue: []},
],
})
export class TaskModule {
}
