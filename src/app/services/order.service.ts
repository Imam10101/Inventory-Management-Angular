// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Customer } from '../models/customer.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7224/api';

  constructor(private http: HttpClient) { }

    // header
    t = localStorage.getItem('jwtToken');
    header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.t,
    });

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/Orders`);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/Orders/${id}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/Orders`, order);
  }

  updateOrder(id: number, order: Order): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Orders/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Orders/${id}`);
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/Customer`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Product`);
  }
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`api/customers/${id}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`api/products/${id}`);
  }
  
}

