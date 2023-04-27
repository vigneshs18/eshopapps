import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { OrdersService } from '@eshopapps/orders';
import { ProductsService } from '@eshopapps/products';
import { UsersService } from '@eshopapps/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  statistics = [];

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
    ]).subscribe((values) => {
      this.statistics = values;
    })
  }

}
