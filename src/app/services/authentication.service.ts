import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { user } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly JWT_TOKEN = 'jwt';
  private readonly REFRESH_TOKEN = 'refreshToken';
  private loggedUser: string;
  private userSubject!: BehaviorSubject<user>;
  public user: Observable<user>;
  private isloggedIn: boolean;
  constructor(private router: Router, private http: HttpClient) {
    this.isloggedIn = false;
  }
  getAuthToken(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/user/login`, {
      username,
      password,
    });
  }

  login(username: string, password: string) {
    this.isloggedIn = true;

    return this.http.post<any>('http://localhost:3000/api/user/login', {
      username,
      password,
    });
  }
  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
