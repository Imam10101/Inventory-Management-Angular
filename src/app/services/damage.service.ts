import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Damage } from '../models/damage.model';
import { Observable } from 'rxjs';



const baseUrl ='https://localhost:7224/api/Damage'
@Injectable({
  providedIn: 'root'
})
export class DamageService {constructor(private http:HttpClient) { }
getAll(): Observable<Damage[]> {
  return this.http.get<Damage[]>(baseUrl);
}

get(id: any): Observable<Damage> {
  return this.http.get<Damage>(`${baseUrl}/${id}`);
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
