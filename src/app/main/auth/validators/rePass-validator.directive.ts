import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { rePassValidator } from '../../../utils/rePass-validator'; 

@Directive({
  selector: '[appRePassValidator]',
  standalone: true,
  providers: [
    {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: rePassValidatorDirective
    }
  ]
})
export class rePassValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const validator = rePassValidator();

    return validator(control);
  }

}