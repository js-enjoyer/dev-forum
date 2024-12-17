import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputLengthValidator } from '../../create/length-validator.directive';
import { HighlightDirective } from '../../../shared/input-highlist.directive';

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
  usernameLength = { maxCount: 12, minCount: 5 };
  passwordLength = { maxCount: 15, minCount: 10 };


  triggerValidation(control: FormControl<any>) {
    control.setValue(control.value); //Manually trigger the validator beacause the value is being replaces by the same one and angular considers it changed so it triggers the validator
  }
}
