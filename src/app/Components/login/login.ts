import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
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
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error.message;
      },
    });
  }
}
