import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchText?: any): any {
     if(Array.isArray(value) && searchText) {
      return value.filter(item => {return item.teacher.toLowerCase().includes(searchText.toLowerCase());});
     }else {
       return value;
     }
  }
}
