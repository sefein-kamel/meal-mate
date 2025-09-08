import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <div class="text-center">
        <h1>LOGIN</h1>
      </div>
      <form class="w-50 my-5 mx-auto" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
            formControlName="username"
          />
        </div>
        <div class="form-group my-5">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            formControlName="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      @if (error) {
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      }
    </div>
  `,
  styleUrl: './login.css',
})
export class Login {
  error: string | null = '';
  loginForm: FormBuilder | any;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: 'emilys',
      password: 'emilyspass',
    });
  }
  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: () => {
         this.toastr.success('Login Successfully!', 'Success');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }
}
