import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationDialogComponent } from '../dialogs/authentication-dialog/authentication-dialog.component';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) { }
  loggedin: boolean;
  auth_token: string;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.auth_token = localStorage.getItem('jwt');
    if (this.auth_token === null) {
      this.dialog.open(AuthenticationDialogComponent);
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
