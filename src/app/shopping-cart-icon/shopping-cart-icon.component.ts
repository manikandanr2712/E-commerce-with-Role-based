import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-icon',
  templateUrl: './shopping-cart-icon.component.html',
  styleUrls: ['./shopping-cart-icon.component.scss']
})
export class ShoppingCartIconComponent {
  @Input() badgeContent: number = 0;
  @Output() cartClicked: EventEmitter<void> = new EventEmitter<void>();

  addToCart(): void {
    this.cartClicked.emit();
  }
}
