import { Component } from '@angular/core';
import {Task} from "../../../task";
import {BackendService} from "../../../core/backend.service";
import {TaskService} from "../../../core/task.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  private _addNewTaskEnabled: boolean = false;
  private _newTask: Task = new Task();
  private _callToAction: string = 'Add Task';
  private _callToActionHeader: string = 'New Task';

  constructor(private backend: BackendService,
              public taskService: TaskService) { }

  onClickAddButton() {
    // if selected task is not displayed then
    if (!this.taskService.isTaskSelect) {
      this._newTask = new Task();
      this.toggleEnabledAddNewTask();
      this.taskService.toggleIsNewTaskSelect();
    }
  }

  toggleEnabledAddNewTask() {
    this._addNewTaskEnabled = !this._addNewTaskEnabled;
  }

  /**
   * Event handler for event emitted by child TaskDetailComponent.
   * Adds the emitted task to task array in backend service
   * if the title and date are not empty.
   * @param task
   */
  async onTaskSave(task: Task) {
    if (task.title && task.description) {
      this.backend.newTask(task);
    }
    this.taskService.toggleIsNewTaskSelect();
    this.toggleEnabledAddNewTask();
  }

  get addNewTaskEnabled(): boolean {
    return this._addNewTaskEnabled;
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
