import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = 'Role-based-auth';
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.role;

      this.showAdminBoard = this.roles.includes('Administrator');
      this.showModeratorBoard = this.roles.includes('User');

      this.username = user.username;
    }
  }

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['login'])
  }
}
