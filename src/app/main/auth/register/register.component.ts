import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputLengthValidator } from '../../../shared/validators/length-validator.directive'; 
import { HighlightDirective } from '../../../shared/input-highlist.directive';
import { EmailValidatorDirective } from '../../../shared/validators/email-validator.directive';
import { DOMAINS, EMAIL_LENGTH, PASSWORD_LENGTH, USERNAME_LENGTH } from '../../../app.constants';
import { rePassValidatorDirective } from '../validators/rePass-validator.directive';
import { AuthService } from '../../../services/auth.service';
import { IsRequiredValidator } from '../../../shared/validators/required-validator.directive';

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
    IsRequiredValidator,
    rePassValidatorDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  domains: string[] = DOMAINS;

  usernameLength = USERNAME_LENGTH;
  emailLength = EMAIL_LENGTH;
  passwordLength = PASSWORD_LENGTH;

  constructor( private authServices: AuthService, private router: Router ) {}

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
        this.router.navigate(['/auth/login']);
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
