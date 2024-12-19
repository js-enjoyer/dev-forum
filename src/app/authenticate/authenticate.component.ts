import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [ LoaderComponent ],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;

  constructor( private authServices: AuthService ) {}

  ngOnInit(): void {
    this.authServices.fetchProfile().subscribe({
      next: (user) => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      }
    })
  }
}
