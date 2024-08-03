import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Return } from '../models/return.model';

const baseUrl ='https://localhost:7224/api/Return'
@Injectable({
  providedIn: 'root'
})
export class ReturnService {constructor(private http:HttpClient) { }
getAll(): Observable<Return[]> {
  return this.http.get<Return[]>(baseUrl);
}

get(id: any): Observable<Return> {
  return this.http.get<Return>(`${baseUrl}/${id}`);
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

