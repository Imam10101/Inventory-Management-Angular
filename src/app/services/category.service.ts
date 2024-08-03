import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';



const baseUrl ='https://localhost:7224/api/categoy'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {constructor(private http:HttpClient) { }
getAll(): Observable<Category[]> {
  return this.http.get<Category[]>(baseUrl);
}

get(id: any): Observable<Category> {
  return this.http.get<Category>(`${baseUrl}/${id}`);
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
