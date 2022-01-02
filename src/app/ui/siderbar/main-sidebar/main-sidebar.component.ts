import { Component } from '@angular/core';
import {AuthorizationService} from '../../../authorization/authorization.service';
import {Filter} from '../../../shared/app-enums';
import {TaskService} from "../../../core/task.service";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {
  public FilterEnum = Filter;
  constructor(public authorization: AuthorizationService,
              private taskService: TaskService) { }

  async onTaskFilter(option: number) {
    await this.taskService.getFilterTaskParameters(option);
  }
}
