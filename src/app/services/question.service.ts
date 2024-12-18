import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/tags';
import { Question } from '../interfaces/questions';
import { QUESTIONS_API } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = QUESTIONS_API;

  constructor(private http: HttpClient) { }

  fetchQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/recommended`);
  }

  fetchCurrQuestion(id: String): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}/details`);
  }

  createQuestion(questionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, questionData);
  }

  fetchTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`);
  }
}

