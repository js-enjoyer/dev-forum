import { Component, ViewChild } from '@angular/core';
import { ContentUser } from '../../../interfaces/user';
import { UserService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { EmailValidatorDirective } from '../../../shared/validators/email-validator.directive';
import { InputLengthValidator } from '../../../shared/validators/length-validator.directive';
import { DOMAINS, EMAIL_LENGTH, PASSWORD_LENGTH, USERNAME_LENGTH } from '../../../app.constants';
import { NgIf } from '@angular/common';
import { IsRequiredValidator } from '../../../shared/validators/required-validator.directive';
import { createDefaultUser } from './default-user';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [ FormsModule, NgIf, EmailValidatorDirective, InputLengthValidator, IsRequiredValidator ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  @ViewChild('editForm') form: NgForm | undefined;

  user: ContentUser;

  imageInputVisible = false;
  passwordInputVisible = false;

  domains: string[] = DOMAINS;
  usernameLength = USERNAME_LENGTH;
  emailLength = EMAIL_LENGTH;
  passwordLength = PASSWORD_LENGTH;

  constructor(
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = createDefaultUser();
    console.log(this.user);
    
  }

  ngOnInit(): void {
    const paramsId = this.route.parent?.snapshot.params['id'];
    
    this.userServices.fetchCurrentUser(paramsId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error(err) {
        console.log('Error fetching user' + err.message);
      }
    })
    
  }

  onSubmit() {
    const data = this.form?.value;
    
    let payload = {
      image: data.image,
      username: data.username,
      description: data.description ? data.description : '',
      oldPassword: data.oldPassword ? data.oldPassword : '',
      newPassword: data.newPassword ? data.newPassword : ''
    }

    console.log(payload);
    
    
    this.userServices.updateUser(payload).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        alert('User Updated successfully!');
        this.router.navigate([`/profile/${this.user._id}/about`])
      },
      error: (err) => {
        console.error('Error Updating User:', err.error.message);
        alert('An error occurred. Please try again.');
      }
    });
  }

  toggleImageInput() {
    this.imageInputVisible = !this.imageInputVisible;
  }

  togglePasswordInput() {
    console.log('toggle');
    
    this.passwordInputVisible = !this.passwordInputVisible;
  }

  triggerValidation(control: FormControl<any>): void {
    control.setValue(control.value);
  }
}
