import { Injectable } from '@angular/core';
import {Task} from "../task";
import {Subject} from "rxjs";
import {ApiService} from "./api.service";
import {AuthorizationService} from "../authorization/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _tasks: Task[] = [];

  constructor(private api: ApiService,
              private auth: AuthorizationService) {
    this.api.get().subscribe(
      (response: any) => {
        let max: number = 0;
        response.Items.forEach((task: Task) => {
          this._tasks.push(Task.fromSelfCopy(task));
          if (task.id > max) max = task.id;
        });
        Task.nextID = max; // update id for new task instances
        this.announceChange(undefined); // announce a change to task array
      });
  }

  // observable sources
  private _changeAnnouncedSource = new Subject<any>();
  private _changeConfirmedSource = new Subject<any>();
  // observable stream
  changeAnnounced = this._changeAnnouncedSource.asObservable();
  changeConfirmed = this._changeConfirmedSource.asObservable();

  announceChange(task: any): void {
    this._changeAnnouncedSource.next(task);
  }

  confirmChange(task: any): void {
    this._changeConfirmedSource.next(task);
  }

  async newTask(task: Task) {
    this.api.post(task).subscribe(
      (response: any) => {
        if (this.wasCallSuccessful(response.status, response.statusText)) {
          this.tasks.push(task);
          this.announceChange(task); // announce a change to task array
        } else
            Task.taskNotSaved();  // task wasn't saved to database
      });
  }

  async editedTask(task: Task) {
    this.api.put(task).subscribe(
      (response: any) => {
        if (this.wasCallSuccessful(response.status, response.statusText)) {
          // @ts-ignore; guaranteed to find the task and update it;
          this._tasks.find(elem => elem.id === task.id).fromOther(task);
          this.announceChange(task); // announce a change to task array
        }
      });
  }

  async deleteTask(task: Task) {
    this.api.delete(task).subscribe(
      (response: any) => {
        if (this.wasCallSuccessful(response.status, response.statusText)) {
          let index = this.tasks.findIndex(elem => elem.id === task.id);
          this._tasks.splice(index, 1);
          this.announceChange(task); // announce a change to task array
        }
      });
  }

  wasCallSuccessful(statusCode: number, statusText: string): boolean {
    if (statusCode !== 200) {
      alert('Error: Task could not be save\n' + `Reason: ${statusText}`);
      return false;
    }
    return true;
  }

  get tasks(): Task[] {
    return this._tasks;
  }
}
