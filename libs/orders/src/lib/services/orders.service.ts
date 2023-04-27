import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { Order } from '../models/order';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  apiUrlOrders = environment.apiUrl + 'orders';

  constructor(private http: HttpClient) { }

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

}
