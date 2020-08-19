import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    value: Array<string>,
    filterString: string,
    propName: string
  ): unknown {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName].toLowerCase().includes(filterString)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
