import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartIconComponent } from '../shopping-cart-icon/shopping-cart-icon.component';
import { CartServiceService } from 'src/services/cart-service.service';
import { AddressComponent } from './address/address.component';
import { SharedModule } from '../_helpers/shared.module';
@NgModule({
  declarations: [
    DashboardComponent,
    AddproductComponent,
    ToolbarComponent,
    ProductListComponent,
    ShoppingCartIconComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,    
    SharedModule,

  ],
  providers: [CartServiceService],
  exports: [ToolbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
