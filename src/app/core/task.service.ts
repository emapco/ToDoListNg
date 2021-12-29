import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _isTaskSelect: boolean = false;
  private _isNewTaskSelect: boolean = false;

  constructor() { }

  toggleIsTaskSelect() {
    this._isTaskSelect = !this._isTaskSelect;
  }

  toggleIsNewTaskSelect() {
    this._isNewTaskSelect = !this._isNewTaskSelect;
  }

  get isTaskSelect(): boolean {
    return this._isTaskSelect;
  }
  set isTaskSelect(value: boolean) {
    this._isTaskSelect = value;
  }

  get isNewTaskSelect(): boolean {
    return this._isNewTaskSelect;
  }

  set isNewTaskSelect(value: boolean) {
    this._isNewTaskSelect = value;
  }
}
