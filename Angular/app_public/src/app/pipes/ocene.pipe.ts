import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocene'
})
export class OcenePipe implements PipeTransform {

  transform(value: number): string {
    var stevilo = 0;
    if( value == 0){
      return "Ne ocenjen";
    }
    return Math.round(value*10)/10 + "";
  }

}
