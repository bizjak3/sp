import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oceneTag'
})
export class oceneTagPipe implements PipeTransform {

  transform(ocena: number): string {
    if (ocena === 0) {
      return 'badge badge-secondary';
    }
    if (ocena < 2) {
      return 'badge badge-danger';
    }
    if (ocena === 5) {
      return 'badge btn btn-success';
    }

    return 'badge btn btn-primary';
  }

}
