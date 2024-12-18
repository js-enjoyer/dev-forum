import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputLengthValidator } from '../../create/length-validator.directive';
import { HighlightDirective } from '../../../shared/input-highlist.directive';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    FormsModule, 
    CommonModule, 
    RouterLink, 
    InputLengthValidator, 
    HighlightDirective 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  @ViewChild('loginForm') form: NgForm | undefined;

  usernameLength = { maxCount: 12, minCount: 5 };
  passwordLength = { maxCount: 20, minCount: 9 };

  constructor( private authServices: AuthService ) {}

  onSubmit() {
    const data = {
      username: this.form?.value.username,
      password: this.form?.value.password
    };

    this.authServices.login(data).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        alert('Logged in successfully!');
      },
      error: (err) => {
        console.error('Error signing in:', err.error.message);
        alert('An error occurred. Please try again.');
      }
    })
  }


  triggerValidation(control: FormControl<any>) {
    control.setValue(control.value); //Manually trigger the validator beacause the value is being replaces by the same one and angular considers it changed so it triggers the validator
  }
}
