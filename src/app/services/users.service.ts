import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ContentUser } from '../interfaces/user';
import { USER_API } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiUrl = USER_API;

    constructor(private http: HttpClient) { }

    fetchUsers(): Observable<ContentUser[]> {
        return this.http.get<ContentUser[]>(`${this.apiUrl}/users`);
    }

    fetchCurrentUser(id: String): Observable<ContentUser> {
        return this.http.get<ContentUser>(`${this.apiUrl}/${id}`);
    }

    updateUser(payload: any): Observable<ContentUser> {
        return this.http.post<ContentUser>(`${this.apiUrl}/edit`, payload);
    }

    upvote(id: any): Observable<ContentUser> {
        return this.http.get<ContentUser>(`${this.apiUrl}/${id}/upvote`);
    }

    downvote(id: any): Observable<ContentUser> {
        return this.http.get<ContentUser>(`${this.apiUrl}/${id}/downvote`);
    }
}