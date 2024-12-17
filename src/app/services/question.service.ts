import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/tags';
import { Question } from '../interfaces/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:3000/questions/create';
  private questionsUrl = 'http://localhost:3000/questions/user'
  private tagsUrl = 'http://localhost:3000/questions/tags';


  constructor(private http: HttpClient) { }

  fetchQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl);
  }

  createQuestion(questionData: any): Observable<any> {
    console.log('sending request');
    
    return this.http.post(this.apiUrl, questionData);
  }

  fetchTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl);
  }
}

