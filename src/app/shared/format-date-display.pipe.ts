import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateDisplay'
})
export class FormatDateDisplayPipe implements PipeTransform {
  private _locale: string = 'en-US';
  private _options = {hour: 'numeric', minute: "numeric"} as const;
  transform(date: number | string): string {
      return new Date(date).toLocaleDateString(this._locale, this._options)
  }
}
