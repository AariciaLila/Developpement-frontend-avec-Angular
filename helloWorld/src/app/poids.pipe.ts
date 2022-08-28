import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poids'
})
export class PoidsPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1000) {
      return `${value / 1000} Kg`;
    } else return `${value} g`;
  }

}
