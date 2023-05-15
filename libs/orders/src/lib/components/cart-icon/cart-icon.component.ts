import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html'
})

export class CartIconComponent implements OnInit {
    cartCount = 0;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe(cart => {
            // If cart is not available. Ex: For 1st time Website User. Then it will return 0
            // This is like if..else stmt only
            this.cartCount = cart?.items?.length ?? 0;
        });
    }
}
