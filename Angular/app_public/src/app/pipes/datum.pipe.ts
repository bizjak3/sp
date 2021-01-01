import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datum'
})
export class DatumPipe implements PipeTransform {

  transform(value: string): string {
    let datum = "";
    let k = value.split("-");
    datum = k[2] + ". " + k[1] + ". " + k[0];
    return datum;
  }

}
