import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escapeHtml',
  standalone: true
})
export class EscapeHtmlPipe implements PipeTransform {
  transform(value: String | undefined): string {
    if (!value) {
        return '';
    }
    console.log(value);
    
    return value.replace(/[<>&"'\/]/g, (char) => `&#${char.charCodeAt(0)};`);
  }
}
