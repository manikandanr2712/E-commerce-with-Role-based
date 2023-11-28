import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/services/cart-service.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // products = [
  //   {
  //     title: 'Product 1',
  //     subtitle: 'Subtitle 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/apple.png',
  //   },
  //   {
  //     title: 'Product 2',
  //     subtitle: 'Subtitle 2',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/orange.png',
  //   },
  //   {
  //     title: 'Product 1',
  //     subtitle: 'Subtitle 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/apple.png',
  //   },
  //   {
  //     title: 'Product 2',
  //     subtitle: 'Subtitle 2',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/orange.png',
  //   },
  //   {
  //     title: 'Product 1',
  //     subtitle: 'Subtitle 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/apple.png',
  //   },
  //   {
  //     title: 'Product 2',
  //     subtitle: 'Subtitle 2',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/orange.png',
  //   },
  //   {
  //     title: 'Product 1',
  //     subtitle: 'Subtitle 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/apple.png',
  //   },
  //   {
  //     title: 'Product 2',
  //     subtitle: 'Subtitle 2',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image: '../../assets/Fruits/orange.png',
  //   },
  //   // Add more products as needed
  // ];
  products: any;
  showSubmenu = false;
  cartItems: any;
  addedToCartProducts: Set<any> = new Set();
  constructor(private router: Router, private cartService: CartServiceService, private snackBar: MatSnackBar, private productService: ProductService) {

  }
  ngOnInit() {
    this.getProduct();
    this.getCart();
  }
  addtocart(product: any) {
    // Check if the product is already in the cart
    this.addedToCartProducts.add(product);
    const existingProduct = this.cartItems.find((item: any) => item.name === product.name);
    // const val = this.cartItems.find((item: any) => item.name === product.name ? item.stockQuantity : '')
    // console.log("mani",val,existingProduct);
    if (existingProduct) {
      // Product is already in the cart, update the quantity
      existingProduct.stockQuantity = (existingProduct.stockQuantity + 1);
      console.log("mani", existingProduct);
      // Send the updated cartItems array to the server only for updates
      this.cartService.updateCart([existingProduct]).subscribe(
        (response: any) => {
          console.log(response, "Updated cart");
        },
        (error: any) => {
          console.error("Error updating cart:", error);
        }
      );
    } else {
      // Product is not in the cart, add it as a new item

      this.cartService.addToCart();
      const newCartItem = {
        // $id: product.$id,
        // UserId: userData?.UserId,
        Price: product.price,
        StockQuantity: product.stockQuantity + 1,
        CreatedAt: new Date(),
        Description: product.description,
        // Id: product.id,
        ImageFile: product.imageFile,
        ImagePath: product.imagePath,
        Name: product.name,
        UpdatedAt: null
      };
console.log(newCartItem);
      // Send the newCartItem to the server for addition
      // this.cartService.addCart(newCartItem).subscribe(
      //   (response: any) => {
      //     console.log(response, "Added to cart");
      //   },
      //   (error: any) => {
      //     console.error("Error adding to cart:", error);
      //   }
      // );
    }

    this.snackBar.open(`${product.name} added to cart`, 'Close', { duration: 2000 });
  }


  getProduct() {
    this.productService.GetProducts().subscribe((response: any) => {
      this.products = response.$values;
    })
  }

  getCart() {
    this.cartService.getCart().subscribe((response: any) => {
      this.cartItems = response.$values;
      // this.cartService.updateCartCount(this.cartItems?.length);
    });
  }
  isAddedToCart(product: any): boolean {
    return this.addedToCartProducts.has(product);
  }
}
