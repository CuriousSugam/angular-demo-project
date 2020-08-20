import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { Observable, from } from 'rxjs';

import { LoginService, UserData, ErrorData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formName: string;
  errorMessage: string;
  isLoading: boolean = false;

  test: boolean = false;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  constructor(private loginService: LoginService, private router: Router) {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('login..', this.loginForm.value);
    let authObservable: Observable<UserData | ErrorData>;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.isLoading = true;

    // Subscribe to the observable returned by login() and navigate to the desired/default route on success.
    authObservable = this.loginService.login(username, password);
    authObservable.subscribe(
      (resData) => {
        console.log('login successful: ', resData);
        this.router.navigate(['/products']);
        this.isLoading = false;
        this.errorMessage = '';
      },
      (error) => {
        console.log('error while login: ', error);
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );

    // Making sure the form is reset and is clean in case of any errors.
    this.loginForm.reset();
    this.formDirective.resetForm();
  }
}
