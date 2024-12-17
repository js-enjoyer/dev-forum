import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputLengthValidator } from '../../create/length-validator.directive'; 
import { HighlightDirective } from '../../../shared/input-highlist.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, InputLengthValidator, HighlightDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  usernameLength = { maxCount: 12, minCount: 5 };
  emailLength = { maxCount: 20, minCount: 10 };
  passwordLength = { maxCount: 15, minCount: 10 };
  
  triggerValidation(control: FormControl<any>) {
    control.setValue(control.value); //Manually trigger the validator beacause the value is being replaces by the same one and angular considers it changed so it triggers the validator
  }
}
