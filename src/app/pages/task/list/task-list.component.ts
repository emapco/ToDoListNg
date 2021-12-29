import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../task";
import {Subscription} from "rxjs";
import {BackendService} from "../../../core/backend.service";
import {TaskService} from "../../../core/task.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  private _isSelectedAll: boolean = false;
  private _callToActionHeader: string = 'Task Detail';
  private _callToAction: string = 'Save Changes';
  private _taskSubscription: Subscription;
  private _tasks: Task[] = [];
  private _selectedTasks: Task[] = [];
  private _displayTask: Task | undefined;

  constructor(private backend: BackendService,
              public taskService: TaskService) {
    // subscription for changes to backend task array
    this._taskSubscription = this.backend.changeAnnounced.subscribe(
      () => {
        this.updateTasks().then();
      });
  }

  async ngOnInit() {
    this._selectedTasks = [];
    await this.updateTasks();
  }

  ngOnDestroy(): void {
    this._taskSubscription.unsubscribe();
  }

  /**
   * Event handler for event emitted by child TaskDetailComponent.
   * Clears the displayed task and then updates the list of tasks
   * @param task
   */
  async onTaskSaved(task: Task) {
    this._displayTask = undefined;
    this.backend.editedTask(task).then(() => this.updateTasks());
  }

  /**
   * Event handler for event emitted by child DeleteTaskComponent.
   * Invokes backend service to delete the tasks
   */
  async onTaskDeleted() {
    this._selectedTasks.forEach((task: Task) => {
      this._displayTask = undefined;
      this.backend.deleteTask(task);
    });
  }

  /**
   * Updates the tasks array that is displayed in the template.
   * Also clears the selectAll and selectedTasks attributes
   */
  async updateTasks() {
    this._isSelectedAll = false;
    this._selectedTasks.splice(0, this._selectedTasks.length);
    this._tasks.splice(0, this._tasks.length);
    this.backend.tasks.forEach((task: Task) => {
      this._tasks.push(Task.fromSelfCopy(task));
    });
  }

  /**
   * Clears the selectedTasks array and populates it if selectedAll checkbox is set
   */
  onSelectAll() {
    this._selectedTasks.splice(0, this._selectedTasks.length);
    if (this._isSelectedAll) {
      this._tasks.forEach((task) => {
        this._selectedTasks.push(task);
      })
    }
  }

  /**
   * Updates selectedTasks array depending on the checked boxes.
   * Handles the selectAll checkbox logic
   * Also handles the display of task details component
   * @param task
   * @param event
   */
  onSelectTask(task: Task, event: any) {
    // add or remove task if checkbox is checked
    let isTaskChecked = event.checked;
    if (isTaskChecked) {
      this._selectedTasks.push(task);
    } else {
      this._selectedTasks.splice(this.findSelectedTask(task), 1)
    }

    // display task detail logic
    let areOtherTasksSelected: boolean = this._selectedTasks.length > 1;
    if (areOtherTasksSelected) {
      // only display detail if only one is selected
      this._displayTask = undefined;
    } else if (isTaskChecked && !this._isSelectedAll && !this.taskService.isNewTaskSelect) {
      // display if task was just checked, isSelectAll and isNewTaskSelect are cleared
      this._displayTask = task;
    } else if (!this.taskService.isNewTaskSelect) {
      // 0-1 tasks selected case; only display if isNewTaskSelect is not set
      this._displayTask = this._selectedTasks[0];
    }

    // logic for task select and select all check box
    if (!isTaskChecked && this._isSelectedAll) {
      // clear selectedAll since user unchecked an option
      this.isSelectedAll = false;
      // user checked all tasks thus set selectAll.
    }else if (this._selectedTasks.length === this._tasks.length) {
      this.isSelectedAll = true;
    }
    this.taskService.isTaskSelect = Boolean(this._displayTask);
  }

  /**
   * Determines if the task is selected. Utilized by mat-checkboxes' [checked].
   * @param task
   */
  isTaskSelected(task: Task): boolean {
    return this._selectedTasks.findIndex(t => t.id == task.id) !== -1;
  }

  /**
   * Finds the index for the task parameter in the selectedTasks array.
   * @param task
   */
  findSelectedTask(task: Task): number {
    return this._selectedTasks.findIndex(t => t.id == task.id);
  }

  get isSelectedAll(): boolean {
    return this._isSelectedAll;
  }

  set isSelectedAll(value: boolean) {
    this._isSelectedAll = value;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  set tasks(value: Task[]) {
    this._tasks = value;
  }

  get displayTask(): Task | undefined {
    return this._displayTask;
  }

  get callToAction(): string {
    return this._callToAction;
  }

  get callToActionHeader(): string {
    return this._callToActionHeader;
  }
}
