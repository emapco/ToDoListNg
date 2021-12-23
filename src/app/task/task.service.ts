import { Injectable } from '@angular/core';
import {BackendService} from "../backend.service";
import {Task} from "./task";
import {Subject} from "rxjs";

@Injectable()
export class TaskService {
  private _tasks: Task[] = [];
  // observable Task sources
  private _changeAnnouncedSource = new Subject<Task>();
  private _changeConfirmedSource = new Subject<Task>();
  // observable Task stream
  changeAnnounced$ = this._changeAnnouncedSource.asObservable();
  changeConfirmed = this._changeConfirmedSource.asObservable();

  constructor(private backend: BackendService) {
    this._tasks = this.backend.getAll();
  }

  announceChange(task: Task) {
    this._changeAnnouncedSource.next(task);
  }

  confirmChange(task: Task) {
    this._changeConfirmedSource.next(task);
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(value: Task[]) {
    this._tasks = value;
  }
}
