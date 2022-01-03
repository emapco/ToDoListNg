import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../task'

@Pipe({
  name: 'pageFilter',
  pure: false
})
export class PageFilterPipe implements PipeTransform {

  transform(tasks: Task[], page: number, pageSize: number): Task[] {
    let initTaskIndex: number = (page)*pageSize;
    let finalTaskIndex: number = (page+1)*pageSize;
    return tasks.filter((_, i) => i >= initTaskIndex && i < finalTaskIndex);
  }

}
