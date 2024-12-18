import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputLengthValidator } from '../../create/length-validator.directive'; 
import { HighlightDirective } from '../../../shared/input-highlist.directive';
import { EmailValidatorDirective } from '../validators/email-validator.directive';
import { DOMAINS } from '../../../app.constants';
import { rePassValidatorDirective } from '../validators/rePass-validator.directive';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    RouterLink, 
    InputLengthValidator, 
    HighlightDirective,
    EmailValidatorDirective,
    rePassValidatorDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  domains: string[] = DOMAINS;

  usernameLength = { maxCount: 12, minCount: 5 };
  emailLength = { maxCount: 20, minCount: 10 };
  passwordLength = { maxCount: 20, minCount: 9 };

  constructor( private authServices: AuthService ) {}

  onSubmit(): void {
    const data = {
      username: this.form?.value.username,
      email: this.form?.value.email,
      password: this.form?.value.password
    };

    this.authServices.register(data).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        alert('Registered successfully!');
      },
      error: (err) => {
        console.error('Error signing up:', err.error.message);
        alert('An error occurred. Please try again.');
      }
    })
  }
  
  triggerValidation(control: FormControl<any>): void {
    control.setValue(control.value); //Manually trigger the validator beacause the value is being replaces by the same one and angular considers it changed so it triggers the validator
  }
}
