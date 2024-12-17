import { ValidatorFn } from "@angular/forms";


export function titleValidatorFn(): ValidatorFn{
   
    return (control) => {
        const isRequired = control.touched && control.value == '';
        //const isInvalid = control.value !== '' && !regExp.test(control.value);

        if(isRequired) {
            return { isRequired: true }
        }
        // if(isInvalid) {
        //     return { isInvalid: true }
        // }

        return null
    }
}