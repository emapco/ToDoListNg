import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthorizationService} from "../authorization/authorization.service";
import {Task} from '../task';

const url: string = 'https://2j7u9kvmyb.execute-api.us-east-1.amazonaws.com/test/tasks'
//const url: string = 'https://4axz1ies1f.execute-api.us-east-1.amazonaws.com/prod/tasks'
let taskTableName = 'ToDoListNg_tasks';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly header;
  private readonly params;

  constructor(private http: HttpClient,
              private auth: AuthorizationService) {
    this.header = {
      'Authorization': `${this.auth.access_token}`,
      'Content-Type': 'application/json'
    };
    this.params = {
      'username': `${this.auth.username}`,
      'TableName': `${taskTableName}`
    };
  }

  /**
   * Makes an API call to backend API to retrieve the current user's tasks
   */
  get() {
    return this.http.get(url, {
      headers: this.header,
      params: this.params,
      observe: 'body',
      responseType: 'json'
    });
  }

  post(task: Task) {
    task.username = this.auth.username;
    let body = {
      'TableName': `${taskTableName}`,
      'ReturnConsumedCapacity': 'TOTAL',
      'Item': task
    };

    return this.http.post(url, body, {
      headers: this.header,
      params: this.params,
      observe: 'response',
      responseType: 'json'
    });
  }

  put(task: Task) {
    task.username = this.auth.username;
    let body = {
      'TableName': `${taskTableName}`,
      'ReturnConsumedCapacity': 'TOTAL',
      'Item': task
    };

    return this.http.post(url, body, {
      headers: this.header,
      params: this.params,
      observe: 'response',
      responseType: 'json'
    });
  }

  delete(task: Task) {
    let deleteUrl = url + `/${taskTableName}/${task.username}/${task.id}`;
    return this.http.delete(deleteUrl, {
      headers: this.header,
      observe: 'response',
      responseType: 'json'
    });
  }
}
