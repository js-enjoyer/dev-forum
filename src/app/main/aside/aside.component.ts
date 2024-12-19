import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  user: User | null = null;

  constructor(private authServices: AuthService) {}

  ngOnInit(): void {
    this.authServices.fetchProfile().subscribe(user => this.user = user);
  }
}
