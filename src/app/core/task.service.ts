import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Filter} from '../shared/app-enums';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private FilterEnum = Filter;

  constructor() { }

  // observable sources
  private _filterAppliedAnnouncedSource = new Subject<any>();
  // observable stream
  filterAppliedAnnounced = this._filterAppliedAnnouncedSource.asObservable();

  announceFilterApplied(filter: any) {
    this._filterAppliedAnnouncedSource.next(filter);
  }

  async getFilterTaskParameters(option: number): Promise<any> {
    if (option === Filter.all) { // exit guard for when no specific filter is applied
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
    let msWeek: number = (1000 * 60 * 60 * 24 * 7);
    switch (option) {
      case this.FilterEnum.today:
        initDate = today;
        endDate = tomorrow;
        break;
      case this.FilterEnum.nextWeek:
        initDate = now;
        endDate = tomorrow + msWeek * 2;
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
}
