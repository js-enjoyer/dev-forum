import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ContentUser } from '../../../interfaces/user';

@Component({
  selector: 'app-profile-about',
  standalone: true,
  imports: [],
  templateUrl: './profile-about.component.html',
  styleUrl: './profile-about.component.css'
})
export class ProfileAboutComponent implements OnInit{
  user: ContentUser | null = null

  constructor(
    private userServices: UserService,
    private authServices: AuthService,
    private route: ActivatedRoute    
  ) {}

  ngOnInit(): void {
    const paramsId = this.route.parent?.snapshot.params['id'];
    
    this.userServices.fetchCurrentUser(paramsId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error(err) {
        console.log('Error fetching user' + err.message)
      }
    })
    
  }
}
