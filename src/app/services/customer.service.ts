import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl ='https://localhost:7224/api/Customer'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {constructor(private http:HttpClient) { }
getAll(): Observable<Customer[]> {
  return this.http.get<Customer[]>(baseUrl);
}

get(id: any): Observable<Customer> {
  return this.http.get<Customer>(`${baseUrl}/${id}`);
}
create(data: any): Observable<any> {
  return this.http.post(baseUrl, data);
}
update(  data: any): Observable<any> {
  return this.http.put(`${baseUrl}`, data);
}
delete(id: any): Observable<any> {
  return this.http.delete(`${baseUrl}/${id}`);
}
deleteAll(): Observable<any> {
  return this.http.delete(baseUrl);
}

}
