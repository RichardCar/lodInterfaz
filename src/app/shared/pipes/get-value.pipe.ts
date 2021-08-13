import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValue'
})
export class GetValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    const obj:any = value;
    return obj.value;
  }

}
