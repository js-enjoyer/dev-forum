import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Tag } from '../../interfaces/tags';
import { QuestionService } from '../../services/question.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  tags: Tag[] = [];
  dropdownVisible: boolean = false;

  searchQuery = '';

  selectedTags: Tag[] = [];
  filteredTags: Tag[] = []; // Default filtered tags

  get isLoggedIn(): boolean {
    return this.authServices.isLogged;
  }
  
  get userId(): String | undefined{
    return this.authServices.userId;
  }

  constructor(
    private authServices: AuthService, 
    private questionServices: QuestionService,
    private router: Router
  ) { 
    this.questionServices.fetchTags().subscribe((tags) => {
      this.tags = tags;
      this.filteredTags = tags;
    });
  }

  ngOnInit(): void {
    this.questionServices.fetchTags().subscribe((tags) => this.tags = tags);
  }

  filterTags(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTags = this.tags.filter(tag =>
      tag.name.toLowerCase().includes(query)
    );
  }

  // Select a tag
  selectTag(tag: any) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
  }

  // Remove a tag from selected
  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(
      selectedTag => selectedTag._id !== tag._id
    );
  }

  onSearch() {
    let tags = this.selectedTags.map(tag => tag._id).join(',');
    this.dropdownVisible = false;
  
    this.router.navigate(['/questions/search'], { queryParams: { search: this.searchQuery, tags: tags } });
  }
  

  onLogout() {
    this.authServices.logout().subscribe({
      next: (response) => {
        console.log('Server response:', response);
        this.router.navigate(['/user/login']);
      },
      error: (err) => {
        console.error('Error logging out:', err.error.message);
        alert('An error occurred. Please try again.');
      }
    })
  }
  // Toggle dropdown visibility
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
