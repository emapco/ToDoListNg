import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Task} from "../../../task";
import {FormatTimeDisplayPipe} from "../../../shared/format-time-display.pipe";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  //encapsulation: ViewEncapsulation.None,
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() task!: Task;
  @Input() action!: string;
  @Input() header!: string;
  @Output() taskSaved = new EventEmitter();
  private _editTask: Task = new Task();
  private _enableEditTitle: boolean = false;
  private _enableEditDescription: boolean = false;
  private _enableEditDate: boolean = false;

  constructor(public formatTimeDisplay: FormatTimeDisplayPipe,
              public dialogRef: MatDialogRef<TaskDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data?:
                {task: Task, action: string, header: string}) {
    if (data) {
      this.task = data.task;
      this.action = data.action;
      this.header = data.header;
    }
  }

  ngOnInit() {
    this._editTask = Task.fromOtherCopy(this.task);
  }

  /**
   * Logic when action button is pressed.
   * Component can either be a dialog or a child so it
   * invokes the appropriate event.
   */
  async onSave() {
    try {  // if component is used as a dialog
      this.dialogRef.close(this._editTask);
    } catch { // component is a child
      this.taskSaved.emit(this._editTask);
    } finally {
      this._enableEditTitle = false;
      this._enableEditDescription = false;
      this._enableEditDate = false;
    }
  }

  /**
   * Updates the task's date if DatePickerEvent returns a valid date
   * Maintains the old time since the user is only modifying the date.
   * @param event
   */
  async updateDate(event: MatDatepickerInputEvent<any, any>) {
    if (event.value !== null) {
      // get the old date's date string (removes the time)
      let oldDateOnly = new Date(this._editTask.date).toDateString();
      // get the ms offset between the oldDateOnly and the task's date.
      let timeOnly = this._editTask.date - new Date(oldDateOnly).getTime();
      this._editTask.date = event.value.getTime() + timeOnly; // append the time of day offset
    }
  }

  /**
   * Updates the task's datetime if TimePickerEvent returns a valid date
   * Tasks date is UTC ms so it need to be converted to DateString before
   * appending the time and then saving the new time as UTC ms.
   * @param value
   */
  async updateTime(value: any) {
    let time_str = new Date(this._editTask.date).toDateString() + ' ' +  value;
    this._editTask.date = new Date(time_str).getTime();
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
