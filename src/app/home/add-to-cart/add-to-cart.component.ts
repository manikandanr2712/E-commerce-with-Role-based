import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/services/cart-service.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {

  cartItems: any;
  cartCount!: number;
  badgeContents: number = 0;
  badgeContent: number = 0;
  constructor(private snackBar: MatSnackBar, private cartService: CartServiceService,private router: Router) {
    this.getCart();
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
    this.cartService.deleteCartItem(item.id).subscribe({
      next: (response: any) => {
        console.log('Item deleted successfully');
        if (response.success) {
          this.getCart();
        } else {
          console.error(response.message);
          // Handle other errors as needed
        }
      },
      error: (error: any) => {
        console.error('Error deleting item:', error);
        // Handle other errors as needed
      }
    });
  }
  
  
  clearCart(): void {
    this.cartService.deleteAllCartItems().subscribe({
      next: (response: any) => {
        console.log('All items deleted successfully');
        if (response.success) {
          this.getCart();
          this.cartItems = [];
          this.updateCart(this.cartItems);
        } else {
          console.error(response.message);
          // Handle other errors as needed
        }
      },
      error: (error: any) => {
        console.error('Error deleting all items:', error);
        // Handle other errors as needed
      }
    });
  }
  updateCart(item?: any): void {
    this.cartService.updateCart(this.cartItems).subscribe((response: any) => {
      this.cartItems = response.$values;
    });
  }

  getCart() {
    this.cartService.getCart().subscribe((response: any) => {
      this.cartItems = response.$values;
      this.badgeContent = response.$values?.length;
      
      this.cartService.updateCartCount(this.badgeContent);
      console.log(this.badgeContent,"badge");
    });
  }
  deleteAllItems(): void {
    this.cartService.deleteAllCartItems().subscribe({
      next: (response: any) => {
        console.log('All items deleted successfully');
        if (response.success) {
          this.getCart();
          this.cartService.updateCartCount(0);
        } else {
          console.error(response.message);
          // Handle other errors as needed
        }
      },
      error: (error: any) => {
        console.error('Error deleting all items:', error);
        // Handle other errors as needed
      }
    });
  }
  back() {
    this.router.navigate(['/dashboard'])
  }
}
