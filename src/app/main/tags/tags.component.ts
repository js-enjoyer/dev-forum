import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Tag } from '../../interfaces/tags';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{
  tags: Tag[] | [] = [];
  filteredTags: Tag[] | [] = [];

  constructor( private questionServices: QuestionService ) {}

  ngOnInit(): void {
    this.questionServices.fetchTags().subscribe((tags) => {
      this.tags = tags;
      this.filteredTags = tags;
    });
  }

  filterTags(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTags = this.tags.filter(tag =>
      tag.name.toLowerCase().includes(query)
    );
  }
}
