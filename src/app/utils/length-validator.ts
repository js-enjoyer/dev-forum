import { ValidatorFn } from "@angular/forms";


export function legnthValidator(count: { maxCount: Number, minCount: Number }): ValidatorFn{
   
    return (control) => {
        const isRequired = control.touched && control.value == '';
        console.log(isRequired);
        
        const isLength = control.value !== '' && (control.value.length > count.maxCount || control.value.length < count.minCount);

        if(isRequired) {
            return { isRequired: true };
        }
        if(isLength) {
            return { isLength: true };
        }

        return null;
    }
}