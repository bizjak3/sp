import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zvezdice'
})
export class ZvezdicePipe implements PipeTransform {

  transform(ocena: number, value: number): string {
      if(ocena >= value){
        return "checked";
      }
      return "";
  }

}
