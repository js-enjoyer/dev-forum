import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { titleValidatorFn } from '../../utils/title-validator';

@Directive({
  selector: '[appTitleValidator]',
  standalone: true,
  providers: [
    {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: TitleValidatorDirective
    }
  ]
})

export class TitleValidatorDirective implements Validator{
  @Input('appTitleValidator') maxCount: number | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = titleValidatorFn();

    return validator(control);
  }

}