import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from "@angular/material/grid-list";

import {MatDividerModule} from "@angular/material/divider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {TaskListComponent} from "./task-list.component";
import {TaskDetailComponent} from "./task-detail.component";
import {FormatDateDisplayPipe} from "../shared/format-date-display.pipe";
import {FormatTimeDisplayPipe} from "../shared/format-time-display.pipe";
import {MatIconModule} from "@angular/material/icon";
import { AddTaskComponent } from './add-task/add-task.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    FormatDateDisplayPipe,
    FormatTimeDisplayPipe,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatRippleModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    TaskListComponent,
    TaskDetailComponent
  ],
  providers: [
    FormatTimeDisplayPipe
  ]
})
export class TaskModule { }
