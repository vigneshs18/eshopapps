import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'; 
import { StripeService } from 'ngx-stripe';

import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  apiUrlOrders = environment.apiUrl + 'orders';
  apiUrlProducts = environment.apiUrl + 'products';

  constructor(
    private http: HttpClient,
    private stripeService: StripeService
    ) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrlOrders}`);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrlOrders}`, order);
  }

  updateOrderStatus(orderStatus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiUrlOrders}/${orderId}`);
  }

  // Note: this is not map() of arrays but it is map() rxjs. That's why it is kept inside pipe().
  // This map() is used to obtain just the resultant number instead of API returned entire object.
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlOrders}/get/count`)
      .pipe(map(
        (objectValue: any) => objectValue.orderCount
      ));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlOrders}/get/totalsales`)
      .pipe(map(
        (objectValue: any) => objectValue.totalsales
      ));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProducts}/${productId}`);
  }

  createCheckoutSession(orderItems: OrderItem[]) {
    return this.http.post(`${this.apiUrlOrders}/create-checkout-session`, orderItems)
    .pipe(switchMap((session: { id: string }) => {
      return this.stripeService.redirectToCheckout({ sessionId: session.id })
    }));
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCachedOrderData(): Order {
    return JSON.parse(localStorage.getItem('orderData'));
  }

  removeCachedOrderData() {
    localStorage.removeItem('orderData');
  }

}
