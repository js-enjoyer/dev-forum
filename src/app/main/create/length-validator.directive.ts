import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { legnthValidator } from '../../utils/length-validator'; 

@Directive({
  selector: '[appLengthValidator]',
  standalone: true,
  providers: [
    {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: InputLengthValidator
    }
  ]
})

export class InputLengthValidator implements Validator{
  @Input('appLengthValidator') maxCount = {} as {maxCount: number, minCount: number};

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = legnthValidator(this.maxCount);

    return validator(control);
  }

}