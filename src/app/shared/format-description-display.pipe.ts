import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTextDisplay'
})
export class FormatTextDisplayPipe implements PipeTransform {

  transform(text: string): string {
    if (text.length > 30) {
      text = text.substring(0, 18) + '...';
    }
    return text
  }

}
