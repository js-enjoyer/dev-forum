import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { emailValidatorFn } from '../../utils/email-validator';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
  providers: [
    {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: EmailValidatorDirective
    }
  ]
})

export class EmailValidatorDirective implements Validator{
  @Input('appEmailValidator') domains: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = emailValidatorFn(this.domains);

    return validator(control);
  }

}