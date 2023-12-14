import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/services/cart-service.service';
import { ProductService } from 'src/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any;
  showSubmenu = false;
  cartItems: any;
  addedToCartProducts: Set<any> = new Set();
  private cartItemsSubscription: Subscription | undefined;
  private productsSubscription: Subscription | undefined;
  userId: any = '';

  constructor(private cartService: CartServiceService, private snackBar: MatSnackBar, private productService: ProductService) {
  }

  ngOnInit() {
    const userdataString = sessionStorage.getItem('user-detail');
    const decodedToken = userdataString ? JSON.parse(userdataString) : null;
    this.userId = decodedToken.userId;
    this.productsSubscription = this.getProduct();
    this.cartItemsSubscription = this.getCart();
  }

  addtocart(product: any) {
    this.addedToCartProducts.add(product);
    var jsonString = sessionStorage.getItem('user-detail');
    if (jsonString !== null) {
      var userData = JSON.parse(jsonString);
    }
    const existingProduct = this.cartItems.find((item: any) => item.name === product.name);

    if (existingProduct) {
      existingProduct.stockQuantity = (existingProduct.stockQuantity + 1);
      this.cartService.updateCart([existingProduct]).subscribe(
        (response: any) => {
          console.log(response, "Updated cart");
        },
        (error: any) => {
          console.error("Error updating cart:", error);
        }
      );
    } else {
      this.cartService.addToCart();
      const newCartItem = {
        UserId: userData?.userId,
        Price: product.price,
        StockQuantity: product.stockQuantity + 1,
        CreatedAt: new Date(),
        Description: product.description,
        ImageFile: product.imageFile,
        ImagePath: product.imagePath,
        Name: product.name,
        UpdatedAt: null
      };

      this.cartService.addCart(newCartItem).subscribe({
        next:(response: any) => {
          console.log(response, "Added to cart");
        },
        error: (error: any) => {
          console.error("Error adding to cart:", error);
        }
      });
    }

    this.snackBar.open(`${product.name} added to cart`, 'Close', { duration: 2000 });
  }

  getProduct(): Subscription {
    return this.productService.GetProducts().subscribe((response: any) => {
      this.products = response.$values;
    });
  }

  getCart(): Subscription {
    return this.cartService.getCart(this.userId).subscribe((response: any) => {
      this.cartItems = response.$values;
    });
  }

  isAddedToCart(product: any): boolean {
    return this.addedToCartProducts.has(product);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscriptions to avoid memory leaks
    if (this.cartItemsSubscription) { 
      this.cartItemsSubscription.unsubscribe();
    }

    if (this.productsSubscription) {      
      this.productsSubscription.unsubscribe();
    }
  }
}
