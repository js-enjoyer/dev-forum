import { ValidatorFn } from "@angular/forms";


export function legnthValidator(count: { maxCount: Number, minCount: Number }): ValidatorFn{
   
    return (control) => {
        const isLength = control.value !== '' && (control.value.length > count.maxCount || control.value.length < count.minCount);

        if(isLength) {
            return { isLength: true };
        }

        return null;
    }
}