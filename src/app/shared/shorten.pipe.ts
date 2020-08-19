import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const l = limit >= 0 ? limit : 100;

    if (value.length > 100) {
      return value.substr(0, l) + ' ...';
    }

    return value;
  }
}
