import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddressComponent } from './address/address.component';
import { CompleteorderComponent } from './completeorder/completeorder.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: ProductListComponent,
      },
      {
        path: "addproduct",
        component: AddproductComponent,
      },
      {
        path: "add-to-cart",
        component: AddToCartComponent,
      },
      {
        path: "address",
        component: AddressComponent,
      },
      {
        path: "complete-order",
        component: CompleteorderComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
