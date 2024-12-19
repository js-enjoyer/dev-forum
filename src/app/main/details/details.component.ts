import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import ActivatedRoute
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/questions';
import { TimeAgoPipe } from '../../pipes/time-age.pipe';
import { EscapeHtmlPipe } from '../../pipes/escape-html.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { IsRequiredValidator } from '../../shared/validators/required-validator.directive';
import { InputLengthValidator } from '../../shared/validators/length-validator.directive';
import { DESCRIPTION_LENGTH } from '../../app.constants';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AnswersService } from '../../services/anwers.service';
import { Answer } from '../../interfaces/answers';
import { mergeMap } from 'rxjs';
import { UserService } from '../../services/users.service';

declare var Prism: any;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [TimeAgoPipe, EscapeHtmlPipe, FormsModule, NgIf, IsRequiredValidator, InputLengthValidator],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('answerForm') form: NgForm | undefined;
  currQuestion: Question | null = null;
  answers: Answer[] | [] = [];

  descriptionLength = DESCRIPTION_LENGTH;

  constructor(
    private questionService: QuestionService,
    private authServices: AuthService,
    private userServices: UserService,
    private answerServices: AnswersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrQuestion();
  }

  getCurrQuestion(): void {
    const questionId = this.route.snapshot.params['id']

    if (questionId) {
      this.questionService.fetchCurrQuestion(questionId)
        .pipe(
          mergeMap((question) => {
            this.currQuestion = question;

            return this.answerServices.fetchAnswers(question._id);
          })
        )
        .subscribe({
          next: (answers) => {
            console.log(answers);
            this.answers = answers;
          },
          error: (err) => {
            console.error('Error fetching answers:', err);
          }
        });
    }
  }
  onUpvote(id: any) {
    this.answerServices.upvote(id).pipe(
      mergeMap((updatedAnswer) => {

        const index = this.answers.findIndex(answer => answer._id === updatedAnswer._id);
        if (index !== -1) {
          this.answers[index] = updatedAnswer;
          this.answers = [...this.answers];
        }

        return this.userServices.upvote(updatedAnswer.owner_id._id);
      })
    ).subscribe({
      next: () => {
        alert('Thank you for your feedback!');
      },
      error: (error) => {
        console.error('Error during upvote:', error.message);
        alert('An error occurred. Please try again.');
      }
    });
  }

  onDownvote(id: any) {
    this.answerServices.downvote(id).subscribe({
      next: (updatedAnswer) => {
        alert('Thank you for your feedback!');
        const index = this.answers.findIndex(answer => answer._id === updatedAnswer._id);

        if (index !== -1) {
          this.answers[index] = updatedAnswer;
          this.answers = [...this.answers]
        }
      },
      error: (error) => {
        console.error('Error downvoting:', error.message);
        alert('An error occurred. Please try again.');
      }
    })
  }

  onSubmit() {
    const data = {
      description: this.form?.value.description,
      code: this.form?.value.code,
      question_id: this.currQuestion?._id,
      owner_id: this.authServices.userId
    }

    this.answerServices.postAnswer(data).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        alert('Answer created successfully!');
        this.router.navigate([`/questions/${this.currQuestion?._id}/details`])
      },
      error: (error) => {
        console.error('Error creating answer:', error.message);
        alert('An error occurred. Please try again.');
      }
    })

  }

  ngAfterViewInit(): void {
    setTimeout(() => Prism.highlightAll(), 0);
  }

  triggerValidation(control: any) {
    control.setValue(control.value);
  }
}

