import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/services/cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit,OnDestroy {
  private cartItemsSubscription: Subscription | undefined;

  cartItems: any;
  badgeContent: number = 0;
  userId: any;

  constructor(private snackBar: MatSnackBar, private cartService: CartServiceService, private router: Router) {
  
    const userdataString = sessionStorage.getItem('user-detail');
    const decodedToken = userdataString ? JSON.parse(userdataString) : null;
    this.userId = decodedToken.userId;
    this.getCart();
  }

  ngOnInit(): void {    
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.stockQuantity;
    }
    return totalPrice;
  }

  increaseQuantity(item: any): void {
    item.stockQuantity++;
    this.updateCart(item);
  }

  decreaseQuantity(item: any): void {
    if (item.stockQuantity > 1) {
      item.stockQuantity--;
      this.updateCart(item);
    } else {
      this.snackBar.open(`Quantity of ${item.name} cannot be less than 1`, 'Close', { duration: 2000 });
    }
  }

  deleteItem(item: any): void {
    this.cartService.deleteCartItem(item.id,this.userId).subscribe({
      next: (response: any) => {
        console.log('Item deleted successfully');
        if (response.success) {
          this.getCart();
        } else {
          console.error(response.message);
        }
      },
      error: (error: any) => {
        console.error('Error deleting item:', error);
      }
    });
  }

  clearCart(): void {
    this.cartService.deleteAllCartItems(this.userId).subscribe({
      next: (response: any) => {
        console.log('All items deleted successfully');
        if (response.success) {
          this.getCart();
          this.cartItems = [];
          this.updateCart(this.cartItems);
        } else {
          console.error(response.message);
        }
      },
      error: (error: any) => {
        console.error('Error deleting all items:', error);
      }
    });
  }

  updateCart(item?: any): void {
    this.cartService.updateCart(this.cartItems).subscribe((response: any) => {
      this.cartItems = response.$values;
    });
  }

  getCart() {
    // Unsubscribe from previous subscription if exists
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }

    this.cartItemsSubscription = this.cartService.getCart(this.userId).subscribe((response: any) => {
      this.cartItems = response.$values;
      this.badgeContent = response.$values?.length;
      this.cartService.updateCartCount(this.badgeContent);
    });
  }

  deleteAllItems(): void {
    this.cartService.deleteAllCartItems(this.userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.getCart();
          this.cartService.updateCartCount(this.cartItems.length);
        } else {
          console.error(response.message);
        }
      },
      error: (error: any) => {
        console.error('Error deleting all items:', error);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.cartItemsSubscription) {   
      this.userId = '';
      this.cartItemsSubscription.unsubscribe();
    }
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
  proceed() {
    this.router.navigate(['/dashboard/address']);
  }

  
}
