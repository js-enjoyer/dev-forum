import { ValidatorFn } from "@angular/forms";

export function emailValidatorFn(domains: string[]): ValidatorFn{
    const domainStr = domains.join('|');

    const regExp = new RegExp(`[A-Za-z0-9]+@gmail\.(${domainStr})`);

    return (control) => {
        const isInvalid = control.value !== '' && !regExp.test(control.value);

        if(isInvalid) {
            return { isInvalid: true }
        }

        return null
    }
}
