import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data:{title:'Dashboard'},
    children: [
      {
        path: "",
        component: ProductListComponent,
        data:{title:'Products'},
      },
      {
        path: "addproduct",
        component: AddproductComponent,
        data:{title:'Add Products'},
      },
      {
        path: "add-to-cart",
        component: AddToCartComponent,
        data:{title:'Cart'},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
