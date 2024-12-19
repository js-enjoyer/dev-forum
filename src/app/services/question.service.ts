import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Tag } from '../interfaces/tags';
import { Question } from '../interfaces/questions';
import { QUESTIONS_API } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = QUESTIONS_API;

  private searchedQuestions$$ = new BehaviorSubject<Question | []>([]);
  public searchedQuestions$ = this.searchedQuestions$$.asObservable();

  searchedQuestions: Question[] | [] = [];
  userSubscription: Subscription | null = null;

  get searched(): Question[] {
    return this.searchedQuestions;
  }

  constructor(private http: HttpClient) { }

  fetchQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/recommended`);
  }

  fetchUserQuestions(id: any): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/user/${id}`);
  }

  fetchSearchedQuestions(data: any): Observable<Question[]> {
    return this.http.post<Question[]>(`${this.apiUrl}/search`, data);
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

  fetchSearchedTags(filter: any): Observable<Tag[]> {
    return this.http.post<Tag[]>(`${this.apiUrl}/tags/search`, filter );
  }
}

