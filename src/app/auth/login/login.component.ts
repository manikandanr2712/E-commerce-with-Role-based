import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { MatchValidator } from '../password-validation';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  roles: string[] = [];
  constructor(private fb: FormBuilder,private authService: AuthService,private storageService: StorageService,
              private router: Router,private snackBar: MatSnackBar,) {

  }

  ngOnInit() {
    this.createLoginForm();
    this.storageService.clean();
     sessionStorage.removeItem('user-detail');
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      emailId: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  get formError() {
    return this.loginForm.controls;
  }
  onCancel() {   
    this.createLoginForm();    
 }
 buttonTriggered(evt: any){
  this.authService.login(this.loginForm.value).subscribe({
    next: (data: any) => {
      this.storageService.saveUser(data);
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/dashboard']);
    },
    error: (err:  Error | any) => {
      this.snackBar.open(`${err.error}`, 'Close', { duration: 2000 });
    }
  });
}
isFormInvalid() {
  console.log("daa");
  return this.loginForm.invalid;
}

}
