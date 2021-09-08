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
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }
  loginForm = this.fb.group({
    username: '',
    password: '',
  });

  ngOnInit(): void { }







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
