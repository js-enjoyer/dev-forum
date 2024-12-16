import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, NgFor, NgIf ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  tags: string[] = [
    'javascript', 'node.js', 'react', 'angular', 'vue.js', 'typescript', 
    'html', 'css', 'python', 'django', 'flask', 'java', 'spring', 'c++', 'rust'
  ];

  // Selected tags
  selectedTags: string[] = ['javascript', 'node.js', 'react'];

  // Dropdown visibility state
  dropdownVisible: boolean = false;

  // Toggle dropdown visibility
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
