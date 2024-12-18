import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/user';

  constructor(private http: HttpClient) { }

  fetchProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

}