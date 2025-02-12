import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChiTietVeService {
  protected url: string = 'https://localhost:7000/api/ChiTietVe';
  constructor(protected http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${this.url}/getAll`);
  }

  public filterChiTietVe(request: any): Observable<any> {
    return this.http.post(`${this.url}/filterChiTietVe`, request);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Delete?inputMaVe=${id}`);
  }

  public update(request: any): Observable<any> {
    return this.http.put(`${this.url}/Update`, request);
  }

  public create(request: any): Observable<any> {
    return this.http.post(`${this.url}/Create`, request);
  }
  public checkValidity(request: any): Observable<any> {
    return this.http.post(`${this.url}/CheckValidity`, request);
  }
}
