import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  apiUrl = 'https://localhost:7257/api';
  data: any;
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  TotalPrice:any;

  constructor(private httpclient: HttpClient) {
    this.cartCountSubject.next(0);
   }

  
  getCartCount(): number {
    var sub = this.cartCountSubject.value === 0 ? this.data : this.cartCountSubject.value;
    return sub;
  }

  getInitialData(data: any) {
    this.data = data ? data : 0;
  }

  addToCart(): void {
    const currentCount = this.cartCountSubject.value;
    this.cartCountSubject.next(currentCount + 1);
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }
  addCart(product: any) {
    const apiUrl = `${this.apiUrl}/Cart/AddCart`;
    return this.httpclient.post(apiUrl, product);
  }
  getCart(userId: string)  {
    const apiUrl = `${this.apiUrl}/Cart/GetCart/${userId}`;
    return this.httpclient.get(apiUrl);
  }

  updateCart(cartItems: any[]){
    // var id = cartItems.id
    const apiUrl = `${this.apiUrl}/Cart/UpdateCart`;
    return this.httpclient.put<any>(apiUrl, cartItems);
  }
  deleteCartItem(cartItemId: number,userId: any) {
    const url = `${this.apiUrl}/Cart/DeleteCart/${userId}/${cartItemId}`;
    return this.httpclient.delete(url);
  }

  deleteAllCartItems(userId: any) {
    const url = `${this.apiUrl}/Cart/DeleteAll/${userId}`;
    return this.httpclient.delete(url);
  }
  
}