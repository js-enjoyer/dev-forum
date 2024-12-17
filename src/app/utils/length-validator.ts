import { ValidatorFn } from "@angular/forms";


export function legnthValidator(count: { maxCount: Number, minCount: Number }): ValidatorFn{
   
    return (control) => {
        const isRequired = control.touched && control.value == '';
        const isInvalid = control.value !== '' && (control.value.length > count.maxCount || control.value.length < count.minCount);

        if(isRequired) {
            return { isRequired: true }
        }
        if(isInvalid) {
            return { isInvalid: true }
        }

        return null
    }
}