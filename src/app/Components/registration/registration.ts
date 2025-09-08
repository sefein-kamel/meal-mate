import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  userRegistrationForm: FormGroup
  submittedData: any = null;  //storage

  constructor(private fb: FormBuilder){
    this.userRegistrationForm=new FormGroup({
      name:new FormControl("", [Validators.required, Validators.minLength(5)]),

      email:new FormControl("", [Validators.required, Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),

      mobile: new FormControl("", [
          Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]),

      password: new FormControl("", [ Validators.required, Validators.minLength(6)]),

      confirmPassword: new FormControl("", [ Validators.required ])
    },
  );
  }



  get name() { return this.userRegistrationForm.get('name'); }
  get email() { return this.userRegistrationForm.get('email'); }
  get mobile() { return this.userRegistrationForm.get('mobile')}
  get password() { return this.userRegistrationForm.get('password'); }
  get confirmPassword() { return this.userRegistrationForm.get('confirmPassword'); }

  // confirm Password
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  // Reset form
  resetForm() {
    this.userRegistrationForm.reset();
  }


  // Register
  onSubmit() {
    if (this.userRegistrationForm.valid) {
      alert("Registered Successfully!\n" + JSON.stringify(this.userRegistrationForm.value, null, 2));
      this.resetForm();
    }
  }
}
