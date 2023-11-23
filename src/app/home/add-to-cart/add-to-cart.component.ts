import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
 
  cartItems: any[] = [
    {
      name: 'Product 1',
      image: '../../../assets/Fruits/apple.png',
      price: 10.99,
      quantity: 2
    },
    {
      name: 'Product 2',
      image: '../../../assets/Fruits/orange.png',
      price: 19.99,
      quantity: 1
    },
    {
      name: 'Product 1',
      image: '../../../assets/Fruits/apple.png',
      price: 10.99,
      quantity: 2
    },
    {
      name: 'Product 2',
      image: '../../../assets/Fruits/orange.png',
      price: 19.99,
      quantity: 1
    },
    {
      name: 'Product 1',
      image: '../../../assets/Fruits/apple.png',
      price: 10.99,
      quantity: 2
    },
    {
      name: 'Product 2',
      image: '../../../assets/Fruits/orange.png',
      price: 19.99,
      quantity: 1
    },
    // Add more items as needed
  ];

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

  constructor(private snackBar: MatSnackBar) {}

  addToCart(product: any) {
    // You can implement your add to cart logic here
    // For now, let's show a simple notification
    this.snackBar.open(`${product.title} added to cart`, 'Close', { duration: 2000 });
  }
  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.snackBar.open(`Quantity of ${this.cartItems[index].name} increased`, 'Close', { duration: 2000 });
  }
  
  // Add this method to decrease quantity if needed
  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.snackBar.open(`Quantity of ${this.cartItems[index].name} decreased`, 'Close', { duration: 2000 });
    } else {
      this.snackBar.open(`Quantity of ${this.cartItems[index].name} cannot be less than 1`, 'Close', { duration: 2000 });
    }
  }
}