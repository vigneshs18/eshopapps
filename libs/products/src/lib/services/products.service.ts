import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  apiUrlProducts = environment.apiUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrlProducts}`);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrlProducts}`, productData);
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlProducts}/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiUrlProducts}/${productId}`);
  }

  getProductCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlProducts}/get/count`)
      .pipe(map(
        (objectValue: any) => objectValue.productCount
      ));
  }

}
