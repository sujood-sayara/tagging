import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  loggedin: boolean;
  auth_token: string;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.auth_token = localStorage.getItem('jwt');

    if (this.auth_token.toString() == 'null') {
      alert(
        'You are not allowed to view this page. You are redirected to login Page' // dont use alerts use a dialog
      );
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
