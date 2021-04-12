import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyName'
})
export class PrettyNamePipe implements PipeTransform {

  transform(value = '', ...args: unknown[]): unknown {
    return value.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

}
