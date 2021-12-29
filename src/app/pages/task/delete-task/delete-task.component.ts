import {Component, EventEmitter, Output} from '@angular/core';
import {TaskService} from "../../../core/task.service";

@Component({
  selector: 'app-remove-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  @Output() taskDeleted = new EventEmitter<any>();

  constructor(private taskService: TaskService) { }

  onDelete() {
    this.taskDeleted.emit();
  }
}
