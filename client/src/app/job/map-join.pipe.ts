import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapJoin',
})
export class MapJoinPipe implements PipeTransform {
  transform(value: any[], ...args: string[]): string {
    const [key] = args;
    return value.map((v) => v[key]).join(', ');
  }
}
