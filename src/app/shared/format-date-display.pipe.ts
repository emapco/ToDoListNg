import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateDisplay'
})
export class FormatDateDisplayPipe implements PipeTransform {
  private _locale: string = 'en-US';
  private _options = {hour: 'numeric', minute: "numeric"};
  transform(date: Date | string): string {
    // @ts-ignore
    return date.toLocaleDateString(this._locale, this._options);
  }
}
