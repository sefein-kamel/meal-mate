import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', Validators.required, Validators.pattern(/^(?=(?:.*[A-Za-z]){2,})([A-Za-z0-9]{8,})$/)],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.auth.register(username!, email!, password!).subscribe({
        next: (res) => {
          console.log('Registered:', res);
          this.router.navigate(['/login']);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
