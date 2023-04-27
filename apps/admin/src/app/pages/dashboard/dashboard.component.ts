import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrdersService } from '@eshopapps/orders';
import { ProductsService } from '@eshopapps/products';
import { UsersService } from '@eshopapps/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endSubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // 'combineLatest' is used to subscribe all 4 Observable returned from respective service functions at once.
    // All 4 fuctions must be resolved to populate the resultant array ('values').
    // The resultant array values holds the same sequence of function calls.
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductCount(),
      this.usersService.getUserCount(),
      this.ordersService.getTotalSales()
    ])
    .pipe(takeUntil(this.endSubs$))
    .subscribe((values) => {
      this.statistics = values;
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
