import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CartItem, CartService } from '@eshopapps/orders';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html'
})

export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  quantity = 1;
  endSubs$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.productId) {
        this._getProduct(params.productId);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProduct(id: string) {
    this.productsService.getProduct(id)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(product => {
      this.product = product;
    });
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };
    this.cartService.setCartItem(cartItem);
  }
}
