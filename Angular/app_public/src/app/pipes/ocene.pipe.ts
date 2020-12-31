import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocene'
})
export class OcenePipe implements PipeTransform {

  transform(value: number): string {
    if(value == "Ne ocenjen" || value == 0){
      return "Ne ocenjen";
    }
    return Math.round(value*10)/10 + "";
  }

}
