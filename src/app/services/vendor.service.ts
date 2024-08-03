import { Injectable } from '@angular/core';
import { Vendor } from '../models/vendor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const baseUrl ='https://localhost:7224/api/Vendor'
@Injectable({
  providedIn: 'root'
})
export class VendorService {constructor(private http:HttpClient) { }
getAll(): Observable<Vendor[]> {
  return this.http.get<Vendor[]>(baseUrl);
}

get(id: any): Observable<Vendor> {
  return this.http.get<Vendor>(`${baseUrl}/${id}`);
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
