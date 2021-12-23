import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimeDisplay'
})
export class FormatTimeDisplayPipe implements PipeTransform {

  transform(date: Date): string {
    return date.getHours() + ':' + date.getMinutes();
  }

}
