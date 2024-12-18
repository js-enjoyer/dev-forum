import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns'; 

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | undefined): string {
    if (!value) {
        return '';
    }
    
    return formatDistanceToNow(new Date(value)) + ' ago';
  }
}
