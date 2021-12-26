import { Injectable } from '@angular/core';
import {Task} from "./pages/task/task";

const TASKS = [new Task('Title1', 'Description1'),
  new Task('Title2', 'Description2'),
  new Task('Title3', 'Description3')];

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  getAll(): Task[] {
    return TASKS;
  }
}
