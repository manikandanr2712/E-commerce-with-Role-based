import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { MenuItem } from '../menu-item';
import { CartServiceService } from 'src/services/cart-service.service';

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
selectedProduct: any; 
menuItems: MenuItem[] = [
  {
    label: 'Products',
    icon: 'donut_small',
    subItems: [
      { label: 'Fruits' },
      { label: 'Vegetables' },
      { label: 'Dairy' },
    ],
  },
  {
    label: 'About',
    icon: 'help',
    subItems:[]
  },
  {
    label: 'Cart',
    icon: 'add_shopping_cart',
    subItems:[]
  },
  // Add more menu items as needed
];
cartCount: number = 0;
badgeContent:number =0;
constructor(
  private storageService: StorageService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private cartService: CartServiceService
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
  this.cartService.cartCount$.subscribe((count) => {
    this.cartCount = count;
    this.badgeContent = this.cartCount;
    console.log(this.cartCount,"sss")
  });
}

logout(): void {
  this.storageService.clean();
  this.router.navigate(['login'])
}

addProduct() {
  this.router.navigate(['/dashboard/addproduct'], { relativeTo: this.activatedRoute });
}
addtocart() {
  this.router.navigate(['/dashboard/add-to-cart']);
}
}
