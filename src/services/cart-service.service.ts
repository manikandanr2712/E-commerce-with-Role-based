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

  constructor(private httpclient: HttpClient) { }

  
  getCartCount(): number {
    var sub = this.cartCountSubject.value === 0 ? this.data : this.cartCountSubject.value;
    console.log("thi",sub)
    return sub;
  }

  getInitialData(data: any) {
    this.data = data ? data : 0;
    console.log("thi",this.data)
  }

  addToCart(): void {
    const currentCount = this.cartCountSubject.value == 0 ? this.data : this.cartCountSubject.value;
    this.cartCountSubject.next(currentCount + 1);
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
    console.log("mani",count)
  }
  addCart(product: any) {
    const apiUrl = `${this.apiUrl}/Cart/AddCart`;
    return this.httpclient.post(apiUrl, product);
  }
  getCart()  {
    const apiUrl = `${this.apiUrl}/Cart/GetCart`;
    return this.httpclient.get(apiUrl);
  }

  updateCart(cartItems: any[]){
    const apiUrl = `${this.apiUrl}/Cart/UpdateCart`;
    return this.httpclient.put<any>(apiUrl, cartItems);
  }
  deleteCartItem(cartItemId: number) {
    const url = `${this.apiUrl}/Cart/DeleteCart/${cartItemId}`;
    return this.httpclient.delete(url);
  }

  deleteAllCartItems() {
    const url = `${this.apiUrl}/Cart/DeleteAll`;
    return this.httpclient.delete(url);
  }
  
}