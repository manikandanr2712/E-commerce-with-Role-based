import { FormGroup } from '@angular/forms';

export class MatchValidator {
    static validate(registrationFormGroup: FormGroup) {
        let password = registrationFormGroup.controls?.['password']?.value;
        let repeatPassword = registrationFormGroup.controls?.['confirmPassword']?.value;

        
        if (repeatPassword.length <= 0) {
            return null;
        }

        if (repeatPassword !== password) {
            return {
                doesMatchPassword: true
            };
        }

        return null;

    }
}