import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '..//services/authentication.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  returnUrl!: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;
  retUrl: string = 'login';

  ngOnInit(): void {
    localStorage.setItem('jwt', null);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    this.authenticationService
      .login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        (data) => {
          localStorage.setItem('jwt', JSON.stringify(data));
          this.router.navigate(['home']);
        },
        (error) => {
          console.log(JSON.stringify(null));
          localStorage.setItem('jwt', JSON.stringify(null));
          this.router.navigate(['login']); //Error callback
          console.error(error);
        }
      );
  }
}
