import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '..//services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  returnUrl!: string; // unused / remove it
  hide = true; // unused / remove it
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
  loginForm = new FormGroup({  // use form builder instead
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
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
          localStorage.removeItem('jwt');
          this.router.navigate(['login']); //Error callback
        }
      );
  }
}
