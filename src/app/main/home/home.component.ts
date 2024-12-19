import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/questions';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TimeAgoPipe } from '../../pipes/time-age.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, TimeAgoPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  questions: Question[] | [] = [];

  constructor(private questionServices: QuestionService, private authSerives: AuthService) {}

  ngOnInit(): void {
    this.getQuestions();
    
  }

  getQuestions():void {
    this.questionServices.fetchQuestions().subscribe({
      next: (questions: Question[]) => {
        console.log(questions);
        
        this.questions = questions;
      },
      error: (err) => {
        console.error('Error fetching questions:', err.message);
      }
    });
  }
}
