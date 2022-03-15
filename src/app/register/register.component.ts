import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private userService: UserService) { }

  ngOnInit(): void { }
  onSubmit() {
    this.userService
      .signup(
        this.registerForm.controls.username.value,
        this.registerForm.controls.password.value
      )
      .subscribe();
  }
}
