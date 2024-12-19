import { ValidatorFn } from "@angular/forms";


export function requiredValidatorFn(): ValidatorFn{
   
    return (control) => {
        const isRequired = control.touched && control.value == '';

        if(isRequired) {
            return { isRequired: true };
        }

        return null;
    }
}