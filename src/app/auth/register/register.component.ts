import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchValidator } from '../password-validation';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService) {

  }

  ngOnInit() {
    this.createRegistrationForm()
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      emailId: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, this.mobileNumberValidator()]], // Add the custom validator
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    },
    {
      validator: MatchValidator.validate.bind(this)
    })
    console.log(this.registrationForm)
  }

  get formError() {
    return this.registrationForm.controls;
  }

  onCancel() {   
     this.createRegistrationForm();    
  }

  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const mobileNumber = control.value;
      // Check if the input is exactly 10 digits
      if (!/^\d{10}$/.test(mobileNumber)) {
        return { mobileNumber: true }; // Validation failed
      }
      return null; // Validation passed
    };
  }

  buttonTriggered(evt: any){
    this.authService.register(this.registrationForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }
  isFormInvalid() {
    return this.registrationForm.invalid;
  }
}