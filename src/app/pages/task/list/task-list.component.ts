import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../task";
import {Subscription} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {BackendService} from "../../../core/backend.service";
import {TaskService} from "../../../core/task.service";
import {Filter} from '../../../shared/app-enums';
import {TaskDetailComponent} from "../detail/task-detail.component";

let async = require('async');

interface FilterType {
  initDate: number,
  endDate: number,
  option: number
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  public callToActionHeader: string = 'Task Detail';
  public callToAction: string = 'Save Changes';
  private _taskListSubscription: Subscription;
  private _taskFilterSubscription: Subscription;
  private _isSelectedAll: boolean = false;
  private _tasks: Task[] = [];
  private _selectedTasks: Task[] = [];
  private _filterType: FilterType = {
    initDate: 0,
    endDate: 0,
    option: Filter.all
  }

  constructor(private backend: BackendService,
              private taskService: TaskService,
              private dialog: MatDialog) {
    // subscription for changes to backend task array
    this._taskListSubscription = this.backend.changeAnnounced.subscribe(
      async () => {
        await this.updateTasks();
      });
    // subscription for when a filter is applied to the tasks
    this._taskFilterSubscription = this.taskService.filterAppliedAnnounced.subscribe(
      async (filter: FilterType) => {
        this._filterType = filter;
        await this.updateTasks();
      }
    )
  }

  async ngOnInit() {
    this._selectedTasks = [];
    await this.updateTasks();
  }

  ngOnDestroy(): void {
    this._taskListSubscription.unsubscribe();
    this._taskFilterSubscription.unsubscribe();
  }

  /**
   * Updates the tasks array that is displayed in the template.
   * Also clears the selectAll and selectedTasks attributes
   */
  async updateTasks(): Promise<void> {
    this._isSelectedAll = false;
    this._selectedTasks.splice(0, this._selectedTasks.length);
    this._tasks.splice(0, this._tasks.length);
    // if all filter is applied then copy each element else filter copy based on dates
    if (this._filterType.option === Filter.all) {
      async.forEachOf(this.backend.tasks, (task: Task) => {
        // make a separate copy so that backend tasks are unchanged
        // and reflect the database's state
        this._tasks.push(Task.fromOtherCopy(task));
      });
    } else {
      async.forEachOf(this.backend.tasks, (task: Task) => {
        if (this._filterType.initDate < task.date && task.date < this._filterType.endDate) {
          this._tasks.push(Task.fromOtherCopy(task));
        }
      });
    }
  }

  /**
   * Clears the selectedTasks array and repopulates it if selectedAll checkbox is set
   */
  async onSelectAll(): Promise<void> {
    this._selectedTasks.splice(0, this._selectedTasks.length);
    if (this._isSelectedAll) {
      async.forEachOf(this._tasks, (task: Task) => {
        this._selectedTasks.push(task);
      });
    }
  }

  /**
   * Updates selectedTasks array depending on the checked boxes.
   * Also handles logic for when the select all checkbox is checked/unchecked
   * @param task   The corresponding task to the (un)checked checkbox.
   * @param event
   */
  async onTaskChecked(task: Task, event: any): Promise<void> {
    // add or remove displayed task if checkbox is checked
    let isTaskChecked = event.checked;
    if (isTaskChecked) {
      this._selectedTasks.push(task);
    } else {
      this._selectedTasks.splice(this.findSelectedTask(task), 1)
    }

    // logic for task select and select all check box
    if (this._isSelectedAll && !isTaskChecked) { // clear selectedAll since user unchecked an option
      this.isSelectedAll = false;
    } else if (this._selectedTasks.length === this._tasks.length) { // all tasks selected thus set selectAll.
      this.isSelectedAll = true;
    }
  }

  /**
   * Event handler for event emitted by child DeleteTaskComponent.
   * Invokes backend service to delete the task(s)
   */
  async onTaskDeleted(): Promise<void> {
    async.forEachOf(this._selectedTasks, (task: Task) => {
      this.backend.deleteTask(task);
    });
  }

  /**
   * Opens a TaskDetail dialog window populated with the clicked task's attribute.
   * Calls backend to save the edits if task is returned (only if saved).
   * @param selectedTask
   */
  async onTaskClicked(selectedTask: Task): Promise<void> {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      data: {
        task: selectedTask,
        action: this.callToAction,
        header: this.callToActionHeader
      },
    });

    dialogRef.afterClosed().subscribe(editedTask => {
      // task returned if changes saved thus call backend to save the edits
      if (editedTask) {
        this.backend.editedTask(editedTask).then(() => this.updateTasks());
      }
    });
  }

  /**
   * Utilized to determine if a task checkbox should be checked
   * since it's in the selectedTask array.
   * @param task
   */
  isTaskSelected(task: Task): boolean {
    return this.findSelectedTask(task) !== -1;
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
}
