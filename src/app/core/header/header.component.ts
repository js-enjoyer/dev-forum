import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Tag } from '../../interfaces/tags';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, NgFor, NgIf ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  tags: Tag[] = [];
  selectedTags: string[] = [];

  dropdownVisible: boolean = false;

  get isLoggedIn(): boolean {
    return this.authServices.isLogged;
  }

  constructor( private authServices: AuthService ) {}

  ngOnInit(): void {
    
  }

  onLogout() {
    this.authServices.logout().subscribe({
      next: (response) => {
        console.log('Server response:', response);
        alert('Logged Out successfully!');
      },
      error: (err) => {
        console.error('Error logging out:', err.error.message);
        alert('An error occurred. Please try again.');
      }
    })
  }
  // Toggle dropdown visibility
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
