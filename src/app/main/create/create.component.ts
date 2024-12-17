import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { TitleValidatorDirective } from './title-validator.directive';
import { HighlightDirective } from '../../shared/input-highlist.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ FormsModule, CommonModule, TitleValidatorDirective, HighlightDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @ViewChild('questionForm') form: NgForm | undefined;

  constructor( private http: HttpClient ) {}

  triggerValidation(control: FormControl<any>) {
    control.setValue(control.value); //Manually trigger the validator beacause the value is being replaces by the same one and angular considers it changed so it triggers the validator
  }

  onSubmit() {
    const form = this.form
    console.log('asdasd');
    console.log(form?.control.value);
    
  }
}
