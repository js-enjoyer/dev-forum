import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/users.service';
import { ContentUser } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { filter, mergeMap, Observable, switchMap, take } from 'rxjs';
import { TimeAgoPipe } from '../../pipes/time-age.pipe';


@Component({
  selector: 'app-profile-questions',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, TimeAgoPipe ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: ContentUser | null = null;
  isOwner: boolean = false;

  constructor( 
    private userServices: UserService,
    private authServices: AuthService,
    private route: ActivatedRoute    
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const paramsId = this.route.snapshot.params['id'];

    this.authServices.fetchProfile().pipe(
      mergeMap((authUser) => {
        if (authUser) {
          let isCurrentUser = paramsId === authUser._id;
          this.isOwner = isCurrentUser;
          
          return this.userServices.fetchCurrentUser(isCurrentUser ? authUser._id : paramsId);
        } else {
          
          throw new Error('No user found');
        }
      })
    ).subscribe({
      next: (user) => {
        this.user = user; // Assign the fetched user data
        this.user.createdAt = new Date(this.user.createdAt);
      },
      error: (err) => console.error('Error:', err)
    });
  }

}
