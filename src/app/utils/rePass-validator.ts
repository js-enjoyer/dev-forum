import { ValidatorFn } from "@angular/forms";

export function rePassValidator(): ValidatorFn{
    
    return (control) => {
        const input = control.value.trim();
        const password = control.parent?.get('password')?.value;
        
        let doesntMatch = input !== '' && input !== password;
        
        if(doesntMatch) {
            return { doesntMatch: true };
        }

        return null;
    }
}