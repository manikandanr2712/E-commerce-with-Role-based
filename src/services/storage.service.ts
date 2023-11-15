import { Injectable } from '@angular/core';
const USER_KEY = 'user-detail';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(user,"user1")
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(user,"user")
    if (user) {
      return true;
    }

    return false;
  }

}
