import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html'
})

export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<void> = new Subject();
  totalPrice: number;
  isCheckout = false;

  constructor (
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.isCheckout = this.router.url.includes('checkout') ? true : false;
  }

  ngOnInit(): void {
    this._getOrderSummery();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getOrderSummery() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map(item => {
          // pipe(take(1)): tells the compilor to take only 1 subscription and finish it as soon as done.
          // Therefore no need to unsubscribe this for stopping memory leak
          this.ordersService.getProduct(item.productId).pipe(take(1)).subscribe(product => {
            this.totalPrice += product.price * item.quantity;
          });
        });
      }
    });
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

}
