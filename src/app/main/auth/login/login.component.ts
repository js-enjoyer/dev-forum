import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm, RequiredValidator } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputLengthValidator } from '../../../shared/validators/length-validator.directive';
import { HighlightDirective } from '../../../shared/input-highlist.directive';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { IsRequiredValidator } from '../../../shared/validators/required-validator.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    InputLengthValidator,
    HighlightDirective,
    IsRequiredValidator
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  @ViewChild('loginForm') form: NgForm | undefined;

  usernameLength = { maxCount: 12, minCount: 5 };
  passwordLength = { maxCount: 20, minCount: 9 };

  get isLoggedIn(): boolean {
    return this.authServices.isLogged;
  }
  constructor(private authServices: AuthService, private router: Router) {}

  onSubmit() {
    const data = {
      username: this.form?.value.username,
      password: this.form?.value.password
    };

    this.authServices.login(data).subscribe({
      next: (profile: User) => {
        console.log('Profile fetched:', profile);
        alert('Logged in and profile fetched successfully!');
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Error:', err.error.message);
        alert(err.error.message);
      }
    })
  }


  triggerValidation(control: FormControl<any>) {
    control.setValue(control.value); //Manually trigger the validator beacause the value is being replaces by the same one and angular considers it changed so it triggers the validator
  }
}
