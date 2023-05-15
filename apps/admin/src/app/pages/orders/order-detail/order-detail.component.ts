import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { Order, OrdersService, ORDER_STATUS } from '@eshopapps/orders';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html'
})

export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderStatuses = [];
  selectedStatus;
  endSubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.ordersService.getOrder(params.id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe((order) => {
          this.order = order;
          this.selectedStatus = `${order.status}`;
          // Note: `${}` is deleberately added, otherwise it was emitting errors.
          // In the DB this field is stored as a Number
          // this.selectedStatus = '3';
          // console.log(this.selectedStatus);
        });
      }
    });
  }

  onStatusChange(event) {
    this.ordersService.updateOrderStatus({ status: event.value }, this.order.id)
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order Status is Updated' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order Status is not Updated' });
      }
    });
  }

}
