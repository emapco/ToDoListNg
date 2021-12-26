import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../task";
import {FormatTimeDisplayPipe} from "../../../shared/format-time-display.pipe";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task!: Task;
  @Input() action!: string;
  @Input() header!: string;
  @Output() taskSaved = new EventEmitter<any>();
  private _editTask: Task = new Task();
  private _enableEditTitle: boolean = false;
  private _enableEditDescription: boolean = false;
  private _enableEditDate: boolean = false;

  constructor(public formatTimeDisplay: FormatTimeDisplayPipe) { }

  ngOnInit() {
    this._editTask = Task.fromSelfCopy(this.task);
  }

  toggleEditTitle() {
    this._enableEditTitle = !this._enableEditTitle;
  }

  toggleEditDescription() {
    this._enableEditDescription = !this._enableEditDescription;
  }

  toggleEditDate() {
    this._enableEditDate = !this._enableEditDate;
  }

  onSave() {
    this.task.fromOther(this._editTask);
    this.taskSaved.emit(this._editTask);
    this._enableEditTitle = false;
    this._enableEditDescription = false;
    this._enableEditDate = false;
  }

  updateDate(event: MatDatepickerInputEvent<any, any>) {
    if (event.value !== null) {
      this._editTask.date = event.value;
    }
  }

  updateTime(value: any) {
    let time_str = this._editTask.date.toDateString();
    this._editTask.date = new Date(time_str + " " + value);
  }

  get editTask(): Task {
    return this._editTask;
  }

  set editTask(value: Task) {
    this._editTask = value;
  }

  get enableEditTitle(): boolean {
    return this._enableEditTitle;
  }

  get enableEditDescription(): boolean {
    return this._enableEditDescription;
  }

  get enableEditDate(): boolean {
    return this._enableEditDate;
  }
}
