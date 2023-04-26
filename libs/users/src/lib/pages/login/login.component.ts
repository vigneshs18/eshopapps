import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are Wrong';

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.email.value, this.loginForm.password.value).subscribe({
      next: (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.authError = true;
        if (err.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later';
        }
      }
    });

  }

}
