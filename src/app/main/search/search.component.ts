import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/questions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  questions: Question[] | [] = [];

  searchQuery: String = '';
  searchTags: String = '';

  constructor( 
    private questionServices: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filter = {
        tags: params['tags'] ? params['tags'].split(',') : [],
        search: params['search'] || ''
      }

      this.questionServices.fetchSearchedTags({tags: filter.tags}).subscribe({
        next: (tags) => {
          if(tags) {
            this.searchTags = tags.map(tag => tag.name).join(', ')
          }
        },
        error: (err) => {
          console.error('Error fetching serached tags:', err.error.message);
        }
      })
      this.searchQuery = filter.search;
      
      this.questionServices.fetchSearchedQuestions(filter).subscribe({
        next: (questions) => {
          this.questions = questions;
        },
        error: (err) => {
          console.error('Error fetching serached questions:', err.error.message);
        }
      })
    });
  }
}
