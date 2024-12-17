import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { HighlightDirective } from '../../shared/input-highlist.directive';
import { QuestionService } from '../../services/question.service';
import { InputLengthValidator } from './length-validator.directive';
import { Tag } from '../../interfaces/tags';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ FormsModule, CommonModule,  HighlightDirective, InputLengthValidator],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  @ViewChild('questionForm') form: NgForm | undefined;

  descriptionLength = { maxCount: 200, minCount: 20 };
  titleLength = { maxCount: 50, minCount: 10 };

  allTags: Tag[] = [];  // Updated to use objects
  selectedTags: Tag[] = []; // Now holding full tag objects

  constructor(private questionServices: QuestionService) {}

  ngOnInit(): void {
    // Fetch all tags from the server when component initializes
    this.getTags();
  }

  // Fetch all tags from the server and store them in the component
  getTags(): void {
    this.questionServices.fetchTags().subscribe({
      next: (tags: Tag[]) => {
        this.allTags = tags;
      },
      error: (err) => {
        console.error('Error fetching tags:', err);
      }
    });
  }

  onSubmit() {
    const data = {
      title: this.form?.value.title,
      description: this.form?.value.description,
      tags: this.selectedTags.map(tag => tag._id), // Send only tag _id to the server
      owner_id: '60f71b6f9f1b2c23d4e7d123'
    };

    this.questionServices.createQuestion(data).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        alert('Question created successfully!');
      },
      error: (error) => {
        console.error('Error creating question:', error.message);
        alert('An error occurred. Please try again.');
      }
    });
  }

  // Toggle selection of a tag
  toggleTagSelection(tag: { _id: string, name: string, description: string }): void {
    if (this.isTagSelected(tag)) {
      // If the tag is already selected, remove it
      this.removeTagById(tag._id);
    } else {
      // If the tag is not selected, add it
      this.selectedTags.push(tag);
    }
  }

  // Check if a tag is selected by checking its _id
  isTagSelected(tag: { _id: string, name: string, description: string }): boolean {
    return this.selectedTags.some(selectedTag => selectedTag._id === tag._id);
  }

  // Remove a tag from the selected tags by its _id
  removeTagById(tagId: string): void {
    this.selectedTags = this.selectedTags.filter(tag => tag._id !== tagId);
  }

  triggerValidation(control: any) {
    control.setValue(control.value); // Manually trigger the validator because the value is being replaced by the same one
  }
}
