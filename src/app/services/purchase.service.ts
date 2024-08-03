import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';
import { Product } from '../models/product.model';
import { Vendor } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = "https://localhost:7224/api"


  constructor(private http:HttpClient) { }

  
  getPurchases():Observable<Purchase[]>{
    return this.http.get<Purchase[]>(`${this.apiUrl}/Purchase`);
  }


  getPurchase(id:number):Observable<Purchase>{
    return this.http.get<Purchase>(`${this.apiUrl}/Purchase${id}`)
  }
  addPurchasse(purchase:Purchase):Observable<Purchase>{
    return this.http.post<Purchase>(`${this.apiUrl}/Purchase`,purchase);
  }
  updatePurchase(id:number,purchase:Purchase):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/Purchase/${id}`,purchase)
  }
  deletePurchase(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/Purchase/${id}`)
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Purchase`);
  }
  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/Purchase`);
  }
 
  getVendor(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`api/vendors/${id}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`api/products/${id}`);
  }
  
}

