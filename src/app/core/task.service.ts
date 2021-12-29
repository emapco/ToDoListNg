import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _isEditTaskSelected: boolean = false;
  private _isNewTaskSelected: boolean = false;

  constructor() { }

  // observable sources
  private _closeEditTaskAnnouncedSource = new Subject();
  // observable stream
  closeEditTaskAnnounced = this._closeEditTaskAnnouncedSource.asObservable();


  announceCloseEditTask(): void {
    this.toggleIsNewTaskSelect();
    this._isEditTaskSelected = false;
    this._closeEditTaskAnnouncedSource.next(undefined);
  }

  announceCloseNewTask(): void {
    this._isNewTaskSelected = false;
    this.toggleIsTaskSelect();
  }

  toggleIsTaskSelect() {
    this._isEditTaskSelected = !this._isEditTaskSelected;
  }

  toggleIsNewTaskSelect() {
    this._isNewTaskSelected = !this._isNewTaskSelected;
  }

  get isEditTaskSelected(): boolean {
    return this._isEditTaskSelected;
  }
  set isEditTaskSelected(value: boolean) {
    this._isEditTaskSelected = value;
  }

  get isNewTaskSelected(): boolean {
    return this._isNewTaskSelected;
  }

  set isNewTaskSelected(value: boolean) {
    this._isNewTaskSelected = value;
  }
}
