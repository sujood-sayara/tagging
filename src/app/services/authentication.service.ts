import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { user } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject!: BehaviorSubject<user>;
  public user: Observable<user>;
  private isloggedIn: boolean;
  constructor(private router: Router, private http: HttpClient) {
    //  this.userSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('user')));
    //this.user = this.userSubject.asObservable();
    this.isloggedIn=false;
  }

  getAuthToken(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/user/login`, {
      username,
      password,
    });
  }
  public get userValue(): user {
  
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    // this.http.post<any>('http://localhost:3000/api/user/login', {
    //   username,
    //   password,
    // }).pipe(
    //    map((user) => {
    //      console.log(user);
    //    console.log('Hi');
    // // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
    //     //console.log(user.json());
    //   // localStorage.setItem('user', JSON.stringify(user));
    //   this.userSubject.next(user);
        
    //  })
    // );
    //this.user=of(this.isloggedIn);
    this.isloggedIn=true;
  
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
    localStorage.removeItem('user');
    //  this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
