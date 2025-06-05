import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTranslate'
})
export class StatusTranslatePipe implements PipeTransform {
  transform(value: string): string {
    const statusMap: {[key: string]: string} = {
      'ACTIVE': 'Активен',
      'COMPLETED': 'Завершен',
      'CANCELED': 'Отменен'
    };
    return statusMap[value] || value;
  }
}