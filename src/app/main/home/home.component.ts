import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../interfaces/questions';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TimeAgoPipe } from '../../pipes/time-age.pipe';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TimeAgoPipe, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  questions: Question[] | [] = [];

  dropdownVisible: boolean = false;
  selectedTags: any[] = [];   // Selected tags
  filteredTags: any[] = [];   // Filtered tags from search
  allTags: any[] = [];

  constructor(private questionServices: QuestionService, private authSerives: AuthService) { }

  ngOnInit(): void {
    this.getQuestions();

  }

  getQuestions(): void {
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

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Handle searching/filtering tags
  filterTags(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredTags = this.allTags.filter(tag =>
      tag.name.toLowerCase().includes(query)
    );
  }

  // Select a tag (add or remove it from selected tags)
  toggleTagSelection(tag: any) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
  }

  // Submit the selected tags (log or send to server)
  submitTags() {
    console.log('Submitted Tags:', this.selectedTags);
    // You can implement further actions here, like sending the tags to the backend
  }

  selectTag(event: Event) {

  }

  removeTag() {

  }
}
