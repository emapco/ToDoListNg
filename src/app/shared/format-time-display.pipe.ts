import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimeDisplay'
})
export class FormatTimeDisplayPipe implements PipeTransform {

  transform(date: number | string): string {
    let displayDate = new Date(date);
    return displayDate.getHours() + ':' + displayDate.getMinutes();
  }

}
