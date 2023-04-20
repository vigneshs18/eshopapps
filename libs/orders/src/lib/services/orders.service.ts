import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
