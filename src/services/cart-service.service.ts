import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  url = 'https://localhost:7257/api';
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private httpclient: HttpClient) { }
  getCartCount(): number {
    return this.cartCountSubject.value;
  }

  addToCart(): void {
    const currentCount = this.cartCountSubject.value;
    this.cartCountSubject.next(currentCount + 1);
  }
  addCart(product: any) {

    const currentDate = new Date();

// Extract individual components
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = currentDate.getDate().toString().padStart(2, '0');
const year = currentDate.getFullYear();

const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

// Construct the formatted string
const formattedDate = `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
    const products = {
      $id: product.$id,
      Price :product.price,
      StockQuantity: product.stockQuantity,
      createdAt: formattedDate,
      description: product.description,
      id: product.id,
      imageFile: product.imageFile,
      imagePath: product.imagePath,
      name: product.name,
      updatedAt :null
    };
    
    console.log(formattedDate,"date");
    return this.httpclient.post(this.url + '/Cart/AddCart', products);
  }
}