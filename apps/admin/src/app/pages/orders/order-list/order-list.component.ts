import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Order, OrdersService, ORDER_STATUS } from '@eshopapps/orders';

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html'
})

export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getOrders() {
    this.ordersService.getOrders()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId)
        .pipe(takeUntil(this.endSubs$))
        .subscribe({
          next: () => {
            this._getOrders();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order is Deleted' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order is not Deleted' });
          }
        });
      }
    });
  }

}
