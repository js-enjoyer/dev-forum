import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/questions';
import { TimeAgoPipe } from '../../pipes/time-age.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ TimeAgoPipe ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']  // Fix styleUrl to styleUrls for consistency
})
export class DetailsComponent implements OnInit {
  currQuestion: Question | null = null;  // To store the current question

  constructor(
    private questionService: QuestionService,   // Service to fetch questions
    private route: ActivatedRoute              // Inject ActivatedRoute to access route params
  ) {}

  ngOnInit(): void {
    this.getCurrQuestion();  // Fetch the current question when the component initializes
  }

  getCurrQuestion(): void {
    const questionId = this.route.snapshot.params['id']  // Get the 'id' from the URL   
    
    if (questionId) {
      // Call the service to fetch the question by id
      this.questionService.fetchCurrQuestion(questionId).subscribe((question: Question) => {
        
        this.currQuestion = question;  // Assign the question data to currQuestion
      });
    }
  }
}

