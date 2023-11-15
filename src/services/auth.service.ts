import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

     login(data:any): Observable<any> {
        const url = `${this.apiUrl}/Login`;
        let params = new HttpParams()
        .set('Email', data?.emailId)
        .set('Password', data?.password)
  
      // Use the params in the request
      return this.http.post(url, null, { params });
      }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

register(registerData: any): Observable<any> {
    const url = `${this.apiUrl}/Register`;

    // Create an HttpParams object to build URL parameters
    let params = new HttpParams()
      .set('Email', registerData.emailId)
      .set('FirstName', registerData.firstName)
      .set('LastName', registerData.lastName)
      .set('PhoneNumber', registerData.mobileNumber)
      .set('Password', registerData.password)
      .set('ConfirmedPassword', registerData.confirmPassword);

    // Use the params in the request
    return this.http.post(url, null, { params });
  }
    
}