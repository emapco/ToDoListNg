import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Filter} from '../shared/app-enums';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private FilterEnum = Filter;
  private _isEditTaskSelected: boolean = false;
  private _isNewTaskSelected: boolean = false;

  constructor() { }

  // observable sources
  private _closeEditTaskAnnouncedSource = new Subject();
  private _filterAppliedAnnouncedSource = new Subject<any>();
  // observable stream
  closeEditTaskAnnounced = this._closeEditTaskAnnouncedSource.asObservable();
  filterAppliedAnnounced = this._filterAppliedAnnouncedSource.asObservable();

  announceCloseEditTask(): void {
    this.toggleIsNewTaskSelect();
    this._isEditTaskSelected = false;
    this._closeEditTaskAnnouncedSource.next(undefined);
  }

  announceCloseNewTask(): void {
    this._isNewTaskSelected = false;
    this.toggleIsTaskSelect();
  }

  announceFilterApplied(filter: any) {
    this._filterAppliedAnnouncedSource.next(filter);
  }

  async filterTasks(option: number): Promise<void> {
    if (option ===Filter.all) {
      this.announceFilterApplied({
        option: option
      });
    }

    let initDate: number;
    let endDate: number;
    let now: number = new Date().getTime();
    let today: Date | number = new Date(new Date().toDateString()); // remove time from date
    today = today.getTime(); // get time in ms
    let tomorrow: Date | number = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow = new Date(tomorrow.toDateString()).getTime();  // remove time from date
    switch (option) {
      case this.FilterEnum.today:
        initDate = today;
        endDate = tomorrow;
        break;
      case this.FilterEnum.nextWeek:
        initDate = now;
        endDate = tomorrow + (1000 * 60 * 60 * 24 * 7) * 2; // + ms in a week
        break;
      case this.FilterEnum.due:
        initDate = now;
        endDate = Infinity;
        break;
      default: // FilterEnum.pastDue:
        initDate = 0;
        endDate = now;
    }

    this.announceFilterApplied({
      initDate: initDate,
      endDate: endDate,
      option: option
    });
  }

  toggleIsTaskSelect() {
    this._isEditTaskSelected = !this._isEditTaskSelected;
  }

  toggleIsNewTaskSelect() {
    this._isNewTaskSelected = !this._isNewTaskSelected;
  }

  get isNewTaskSelected(): boolean {
    return this._isNewTaskSelected;
  }

  set isNewTaskSelected(value: boolean) {
    this._isNewTaskSelected = value;
  }
}
