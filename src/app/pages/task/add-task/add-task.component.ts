import {Component} from '@angular/core';
import {Task} from "../../../task";
import {BackendService} from "../../../core/backend.service";
import {TaskService} from "../../../core/task.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskDetailComponent} from "../detail/task-detail.component";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  private _newTask: Task | undefined;
  private _callToAction: string = 'Add Task';
  private _callToActionHeader: string = 'New Task';
  public showDetail: boolean = false;

  constructor(private backend: BackendService) {
  }

  /**
   * Opens child TaskDetailComponent and
   * populates it with a new instance of Task.
   */
  onClickAddButton() {
    this._newTask = new Task();
    this.showDetail = !this.showDetail;
  }

  /**
   * Event handler for event emitted by child TaskDetailComponent.
   * Adds the emitted task to task array in backend service
   * if the title and date are not empty.
   * @param task
   */
  async onTaskSave(task: Task) {
    if (task.title || task.description) {
      await this.backend.newTask(task);
    }
    this.showDetail = false;
  }

  /**
   * Event handler for event emitted by child TaskDetailComponent
   * Removes the TaskDetailComponent from the view.
   */
  async onTaskCancelled() {
    this.showDetail = false;
  }

  get newTask(): Task {
    if (!this._newTask)
      return new Task();
    return this._newTask;
  }

  get callToAction(): string {
    return this._callToAction;
  }

  get callToActionHeader(): string {
    return this._callToActionHeader;
  }
}
