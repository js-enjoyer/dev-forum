import { Component, OnInit } from '@angular/core';
import { ContentUser } from '../../interfaces/user';
import { UserService } from '../../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: ContentUser[] | [] = [];

  constructor(private userServices: UserService) {}

  ngOnInit(): void {
    this.userServices.fetchUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err.message);
      }
    })
  }
}
