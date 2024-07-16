import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noCommaNumber'
})
export class NoCommaNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    if (typeof value === 'number') {
        // Convert to string and remove commas
        return value.toLocaleString('en-US', { useGrouping: false });
      } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
        // Convert string to number and remove commas
        return parseFloat(value).toLocaleString('en-US', { useGrouping: false });
      } else {
        // If the input is not a number or a numeric string, return as is
        return value;
      }
  }
}