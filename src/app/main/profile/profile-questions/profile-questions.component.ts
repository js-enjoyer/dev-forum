import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/users.service';
import { ContentUser } from '../../../interfaces/user';
import { Question } from '../../../interfaces/questions';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-profile-questions',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './profile-questions.component.html',
  styleUrl: './profile-questions.component.css'
})
export class ProfileQuestionsComponent {
  userQuestions: Question[] | [] = [];

  constructor( 
    private questionServices: QuestionService,
    private route: ActivatedRoute    
  ) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    const paramsId = this.route.parent?.snapshot.params['id'];
    console.log(paramsId);
    
    this.questionServices.fetchUserQuestions(paramsId).subscribe({
      next: (questions) => {     
        this.userQuestions = questions;
      },
      error: (error) => {
        console.error('Error fetching question:', error.message);
        alert('An error occurred. Please try again.');
      }
    })
  }
}
