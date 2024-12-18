import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { User } from '../interfaces/user';
import { USER_API } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiUrl = USER_API;

    user$$ = new BehaviorSubject<User | null>(null)
    user$ = this.user$$.asObservable();

    user: User | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) { 
        this.user$.subscribe((user) => {
            this.user = user;
        })
    }

    fetchProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/profile`)
        .pipe(tap((user) => this.user$$.next(user)));
    }

    login(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, userData);
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    logout(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/logout`)
        .pipe(tap(() => this.user$$.next(null)));
    }

}