import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../task";
import {Subscription} from "rxjs";
import {BackendService} from "../../../core/backend.service";
import {TaskService} from "../../../core/task.service";
import {Filter} from '../../../shared/app-enums';

interface filter {
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
  private _isSelectedAll: boolean = false;
  private _callToActionHeader: string = 'Task Detail';
  private _callToAction: string = 'Save Changes';
  private _taskListSubscription: Subscription;
  private _taskCloseSubscription: Subscription;
  private _taskFilterSubscription: Subscription;
  private _tasks: Task[] = [];
  private _selectedTasks: Task[] = [];
  private _displayTask: Task | undefined;

  constructor(private backend: BackendService,
              private taskService: TaskService) {
    // subscription for changes to backend task array
    this._taskListSubscription = this.backend.changeAnnounced.subscribe(
      () => {
        this.updateTasks().then();
      });
    // subscription for when the edit task needs to be closed
    this._taskCloseSubscription = this.taskService.closeEditTaskAnnounced.subscribe(
      () => {
        this._selectedTasks.splice(0, this._selectedTasks.length);
        this._displayTask = undefined;
      });
    this._taskFilterSubscription = this.taskService.filterAppliedAnnounced.subscribe(
      async (filter: filter) => {
        await this.updateTasks();
        if (filter.option !== Filter.all)
          this._tasks = this._tasks.filter(task => (filter.initDate < task.date && task.date < filter.endDate));
      }
    )
  }

  async ngOnInit() {
    this._selectedTasks = [];
    await this.updateTasks();
  }

  ngOnDestroy(): void {
    this._taskListSubscription.unsubscribe();
    this._taskCloseSubscription.unsubscribe();
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
      this._tasks.push(Task.fromSelfCopy(task)); // makes copies so that backend reflects the database
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
   * @param task
   * @param event
   */
  onSelectTask(task: Task, event: any) {
    // add or remove displayed task if checkbox is checked
    let isTaskChecked = event.checked;
    if (isTaskChecked) {
      this._selectedTasks.push(task);
    } else {
      this._selectedTasks.splice(this.findSelectedTask(task), 1)
    }

    this.displayTaskDetail(isTaskChecked);

    // logic for task select and select all check box
    if (!isTaskChecked && this._isSelectedAll) {
      this.isSelectedAll = false; // clear selectedAll since user unchecked an option
    }else if (this._selectedTasks.length === this._tasks.length) { // all tasks selected thus set selectAll.
      this.isSelectedAll = true;
    }
    this.taskService.announceCloseNewTask();
  }

  /**
   * Determines if task detail should be displayed
   * Displays task detail only if one task is select
   * @param isTaskChecked
   */
  displayTaskDetail(isTaskChecked: boolean) {
    let areOtherTasksSelected: boolean = this._selectedTasks.length !== 1;
    if (areOtherTasksSelected) {
      this._displayTask = undefined;
    } else {
      this._displayTask = this._selectedTasks[0];
    }
  }

  /**
   * Event handler for event emitted by child TaskDetailComponent.
   * Clears the displayed task and then updates the list of tasks
   * after invoking backend service to update the task
   * @param task
   */
  async onTaskSaved(task: Task) {
    this._displayTask = undefined;
    this.backend.editedTask(task).then(() => this.updateTasks());
  }

  /**
   * Event handler for event emitted by child DeleteTaskComponent.
   * Invokes backend service to delete the task(s)
   */
  async onTaskDeleted() {
    this._selectedTasks.forEach((task: Task) => {
      this._displayTask = undefined;
      this.backend.deleteTask(task);
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

  get isSelectedAll(): boolean {
    return this._isSelectedAll;
  }

  set isSelectedAll(value: boolean) {
    this._isSelectedAll = value;
  }

  get tasks(): Task[] {
    return this._tasks;
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
