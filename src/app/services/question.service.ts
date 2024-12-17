import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:3000/questions/create'; // your API endpoint

  constructor(private http: HttpClient) { }

  createQuestion(questionData: any): Observable<any> {
    return this.http.post(this.apiUrl, questionData);
  }
}

