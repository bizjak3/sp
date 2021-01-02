import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oceneTagText'
})
export class oceneTagTextPipe implements PipeTransform {

  transform(ocena: number): string {
    if (ocena === 0) {
      return 'NI OCENE';
    }
    if (ocena < 2) {
      return 'SLABA OCENA!';
    }
    if (ocena === 5) {
      return 'SUPER OCENA!';
    }

    return 'POVPREČNA OCENA';
  }

}


