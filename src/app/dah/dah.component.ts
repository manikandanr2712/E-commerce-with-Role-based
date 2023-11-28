import { Component } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';


@Component({
  selector: 'app-dah',
  templateUrl: './dah.component.html',
  styleUrls: ['./dah.component.scss']
})
export class DahComponent {
  isMenuOpen = false;
  isSubmenuOpen = false;
  badgeContent = "3";

  cartItems: any[] = [
    {
      name: 'Product 1',
      price: 20.99,
      quantity: 2,
      total: 41.98,
      imagePath: 'path/to/image1.jpg'
    },
    {
      name: 'Product 2',
      price: 15.49,
      quantity: 1,
      total: 15.49,
      imagePath: 'path/to/image2.jpg'
    },
    // Add more items as needed
  ];

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  addToCart(item: any): void {
    // Check if the item is already in the cart
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      // If the item is already in the cart, increase the quantity
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      // If the item is not in the cart, add it
      const newItem = { ...item, quantity: 1, total: item.price };
      this.cartItems.push(newItem);
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isSubmenuOpen = false; // Close submenu when menu is toggled
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
  
}
