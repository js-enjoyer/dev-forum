import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/questions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  questions: Question[] | [] = [];

  constructor(private questionServices: QuestionService) {}

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
