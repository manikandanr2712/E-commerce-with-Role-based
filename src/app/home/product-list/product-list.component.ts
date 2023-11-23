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
  products :any;
  showSubmenu = false;
  constructor(private router: Router,private cartService: CartServiceService,private snackBar: MatSnackBar,private productService: ProductService){
  
  }
  ngOnInit() {
    this.getProduct();
  }
// onMenuItemHover(product: any) {
//   // Check if the hovered menu item has the icon "Products"
//   this.showSubmenu = product.label === 'Products' ;
  
//   console.log("puo",product,this.showSubmenu)
// }

// onMenuItemLeave() {
//   // Hide the submenu when leaving the menu item
//   this.showSubmenu = false;
// }
addtocart(product: any) {
  // this.router.navigate(['dashboard/add-to-cart'])
  console.log("mani",product);
  this.cartService.addToCart();
  this.cartService.addCart(product).subscribe((response:any) => {
    console.log(response,"as");
  })
  this.snackBar.open(`${product?.name} added to cart`, 'Close', { duration: 2000 });
}
getProduct() {
  this.productService.GetProducts().subscribe((response:any) => {
    this.products = response.$values;
  })
}
}
