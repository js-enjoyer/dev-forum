import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { requiredValidatorFn } from '../../utils/required-validator';

@Directive({
  selector: '[appRequiredValidator]',
  standalone: true,
  providers: [
    {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: IsRequiredValidator
    }
  ]
})

export class IsRequiredValidator implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = requiredValidatorFn();

    return validator(control);
  }

}