import { Component, OnInit } from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../../../core/task.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  private _enabledAddNewTask: boolean = false;
  private _newTask: Task = new Task();
  private _callToAction: string = 'Add Task';
  private _callToActionHeader: string = 'New Task';

  constructor(private _taskServ: TaskService) { }

  ngOnInit(): void {
  }

  onClickAddNew() {
    this._newTask = new Task();
    this.toggleEnabledAddNewTask();
  }

  toggleEnabledAddNewTask() {
    this._enabledAddNewTask = !this._enabledAddNewTask;
  }

  /**
   * Adds the emitted task to task array in task service
   * only if the title and date are not empty.
   * @param task
   */
  onTaskSave(task: Task) {
    if (task.title || task.description) {
      this._taskServ.tasks.push(task);
      this.announceChange();
    }
    this.toggleEnabledAddNewTask();
  }

  /**
   * Announces a change to task service
   */
  announceChange() {
    this._taskServ.announceChange(this._newTask);
  }

  get enabledAddNewTask(): boolean {
    return this._enabledAddNewTask;
  }

  set enabledAddNewTask(value: boolean) {
    this._enabledAddNewTask = value;
  }

  get newTask(): Task {
    return this._newTask;
  }

  get callToAction(): string {
    return this._callToAction;
  }

  get callToActionHeader(): string {
    return this._callToActionHeader;
  }
}
