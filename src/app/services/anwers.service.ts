import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ANSWERS_API } from '../app.constants';
import { Answer } from '../interfaces/answers';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  apiUrl = ANSWERS_API;

  constructor(private http: HttpClient) { }

  fetchAnswers(id: any): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/question/${id}`);
  }

  postAnswer(data: any): Observable<Answer> {
    return this.http.post<Answer>(`${this.apiUrl}/create`, data);
  }

  upvote(id: any): Observable<Answer> {
    return this.http.get<Answer>(`${this.apiUrl}/${id}/upvote`);
  }

  downvote(id: any): Observable<Answer> {
    return this.http.get<Answer>(`${this.apiUrl}/${id}/downvote`);
  }
}

