import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

import { User } from '../interfaces/user';
import { USER_API } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy{
    apiUrl = USER_API;

    private user$$ = new BehaviorSubject<User | null>(null)
    public user$ = this.user$$.asObservable();

    user: User | null = null;
    userSubscription: Subscription | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        this.userSubscription = this.user$.subscribe((user) => {
          this.user = user;
        });
      }

    fetchProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/profile`)
        .pipe(tap((user) => this.user$$.next(user)));
    }

    login(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, userData)
        .pipe(tap((user) => this.user$$.next(user)));
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    logout(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/logout`)
        .pipe(tap(() => this.user$$.next(null)));
    }

    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe();
    }
}