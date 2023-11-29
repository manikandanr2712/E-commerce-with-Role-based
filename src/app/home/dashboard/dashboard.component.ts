import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
import { MenuItem } from '../menu-item';
import { CartServiceService } from 'src/services/cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private cartCountSubscription: Subscription | undefined;
  private getCartSubscription: Subscription | undefined;

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
      subItems: []
    },
    {
      label: 'Cart',
      icon: 'add_shopping_cart',
      subItems: []
    },
    // Add more menu items as needed
  ];
  cartCount!: number;
  badgeContents: number = 0;
  badgeContent: number = 0;

  count: boolean = false;
  userId: any;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartServiceService
  ) {
    this.getCartSubscription =this.getCartMethod()
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.role;

      this.showAdminBoard = this.roles.includes('Administrator');
      this.showModeratorBoard = this.roles.includes('User');

      this.username = user.username;
    }

    // Subscribe to cartCount$ observable
    this.cartCountSubscription = this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      console.log(this.cartCount)
      if (this.count === false) {
        this.badgeContent = this.cartCount;
        this.count = true;
      } else {
        this.badgeContent = this.cartCount;
      }
    });
    const userdataString = sessionStorage.getItem('user-detail');
    const decodedToken = userdataString ? JSON.parse(userdataString) : null;
    this.userId = decodedToken.userId;
    // Call the getCartMethod and subscribe to its observable
    this.getCartSubscription = this.getCartMethod();
  }

  logout(): void {
    sessionStorage.removeItem('user-detail');
    this.router.navigate([''])
  }

  addProduct() {
    this.router.navigate(['/dashboard/addproduct'], { relativeTo: this.activatedRoute });
  }

  addtocart() {
    this.router.navigate(['/dashboard/add-to-cart']);
  }

  getCartMethod(): Subscription {
    return this.cartService.getCart(this.userId).subscribe((response: any) => {
      this.badgeContent = response.$values?.length;
      console.log("manidashboar", this.badgeContent);
      this.cartService.getInitialData(this.badgeContent);
      this.cartService.updateCartCount(this.badgeContent);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions to avoid memory leaks
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }

    if (this.getCartSubscription) {
      this.getCartSubscription.unsubscribe();
    }
  }
}
