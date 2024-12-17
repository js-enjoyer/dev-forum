// import { Directive, Input } from '@angular/core';
// import { AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors, Validator } from '@angular/forms';

// @Directive({
//   selector: '[appInputValidator]',
//   standalone: true,
//   providers: [
//     {
//     provide: NG_VALIDATORS,
//     multi: true,
//     useExisting: EmailValidatorDirective
//     }
//   ]
// })

// export class EmailValidatorDirective implements Validator{
//   @Input('appInputValidator') domains: string[] = [];

//   validate(control: AbstractControl): ValidationErrors | null {
//     const validator = emailValidatorFn(this.domains);

//     return validator(control);
//   }

// }