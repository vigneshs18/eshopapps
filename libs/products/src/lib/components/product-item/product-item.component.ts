import { Component, Input } from '@angular/core';

import { Product } from '../../models/product';
import { CartService, CartItem } from '@eshopapps/orders';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})

export class ProductItemComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
  }

}
