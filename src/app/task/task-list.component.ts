import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "./task";
import {TaskService} from "./task.service";
import {Subscription} from "rxjs";
import {FormatTimeDisplayPipe} from "../shared/format-time-display.pipe";
import {FormatDateDisplayPipe} from "../shared/format-date-display.pipe";

interface TaskUI {
  task: Task;
  selected: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit, OnDestroy {
  private _selectedAll: boolean = false;
  private _callToActionHeader: string = 'Task Detail';
  private _callToAction: string = 'Save Changes';
  subscription: Subscription;
  private _tasks: TaskUI[] = [];
  private _selectedTask: TaskUI | undefined;

  constructor(private service: TaskService) {
    // subscription for changes to TaskService task array
    this.subscription = service.changeAnnounced$.subscribe(
      task => {
        this.updateTasks();
      }
    )
  }

  ngOnInit(): void {
    this.updateTasks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateTasks() {
    this._tasks.splice(0, this._tasks.length);
    this.service.tasks.forEach((task) => {
      this._tasks.push({task: task, selected: false});
    });
  }

  onSelectAll() {
    this._tasks.forEach((taskUI) => {
      taskUI.selected = this._selectedAll;
      this._selectedTask = undefined;
    })
  }

  /**
   *
   * @param taskUI
   */
  onSelectTask(taskUI: TaskUI) {
    let otherTaskSelected: boolean = this.areOtherTasksSelected();
    if (otherTaskSelected) {
      this._selectedTask = undefined;
    } else if (taskUI.selected && !this._selectedAll) {
      this._selectedTask = taskUI;
    }
    // logic for user deselecting tasks
    if (!otherTaskSelected) {
      this._selectedTask = this.firstTaskSelected();
    }
    // uncheck selectAll if was previously set but user deselected one
    if (!taskUI.selected && this._selectedAll) {
      this.selectedAll = false;
    }
  }

  onTaskSaved(task: any) {
    this._selectedTask = undefined;
    this.updateTasks();
  }

  /**
   * Determines if more than one task select box is checked/selected
   */
  areOtherTasksSelected() {
    let otherTaskSelected: boolean = false;
    let status: boolean = false;
    for (const taskUI of this._tasks) {
      if (taskUI.selected) {
        if (otherTaskSelected) {
          status = true;
          break;
        }
        otherTaskSelected = true;
      }
    }
    return status;
  }

  firstTaskSelected(): TaskUI | undefined {
    for (const taskUI of this._tasks) {
      if (taskUI.selected) {
        return taskUI;
      }
    }
    return undefined
  }

  get selectedAll(): boolean {
    return this._selectedAll;
  }

  set selectedAll(value: boolean) {
    this._selectedAll = value;
  }

  get tasks(): TaskUI[] {
    return this._tasks;
  }

  set tasks(value: TaskUI[]) {
    this._tasks = value;
  }

  get selectedTask(): TaskUI | undefined {
    return this._selectedTask;
  }

  get callToAction(): string {
    return this._callToAction;
  }

  get callToActionHeader(): string {
    return this._callToActionHeader;
  }
}
