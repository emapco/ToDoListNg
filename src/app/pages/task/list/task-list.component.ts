import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../../../core/task.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  private _selectedAll: boolean = false;
  private _callToActionHeader: string = 'Task Detail';
  private _callToAction: string = 'Save Changes';
  private _subscription: Subscription;
  private _tasks: Task[] = [];
  private _selectedTasks: Task[] = [];
  private _displayTask: Task | undefined;

  constructor(public taskService: TaskService) {
    // subscription for changes to TaskService task array
    this._subscription = taskService.changeAnnounced$.subscribe(
      _ => {
        this.updateTasks();
      }
    )
  }

  ngOnInit(): void {
    this._selectedTasks = [];
    this.updateTasks();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * Event handler for event emitted by child TaskDetailComponent.
   * @param task
   */
  onTaskSaved(task: any) {
    this._displayTask = undefined;
    this.updateTasks();
  }

  /**
   * Clears the selectedTasks array and populates it if selectedAll checkbox is set
   */
  onSelectAll() {
    this._selectedTasks.splice(0, this._selectedTasks.length);
    if (this._selectedAll) {
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
    let isTaskChecked = event.checked;
    // add or remove task if checkbox is checked
    if (isTaskChecked) {
      this._selectedTasks.push(task);
    } else {
      this._selectedTasks.splice(this.findSelectedTask(task), 1)
    }

    let areOtherTasksSelected: boolean = this._selectedTasks.length > 1;
    // display task detail logic
    if (areOtherTasksSelected) {
      this._displayTask = undefined; // only display detail if only one is selected
    } else if (isTaskChecked && !this._selectedAll) {
      this._displayTask = task;
    } else {
      this._displayTask = this._selectedTasks[0];
    }

    // logic for task select and select all check box
    if (!isTaskChecked && this._selectedAll) {
      this.selectedAll = false; // clear selectedAll since user unchecked an option
    }else if (this._selectedTasks.length === this._tasks.length) {
      this.selectedAll = true; // user checked all tasks thus set selectAll.
    }
  }

  /**
   * Updates the tasks array that is displayed in the template.
   * Also clears the selectAll and selectedTasks attributes
   */
  updateTasks() {
    this._selectedAll = false;
    this._selectedTasks.splice(0, this._selectedTasks.length);
    this._tasks.splice(0, this._tasks.length);
    this.taskService.tasks.forEach((task: Task) => {
      this._tasks.push(task);
    });
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

  get selectedAll(): boolean {
    return this._selectedAll;
  }

  set selectedAll(value: boolean) {
    this._selectedAll = value;
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
