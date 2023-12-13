import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KhachHangService {
  protected url: string = 'https://localhost:7000/api/KhachHangs';
  constructor(protected http: HttpClient) {}

  public getByMaTaiKhoan(code: number): Observable<any> {
    return this.http.get(`${this.url}/GetByMaTaiKhoan/${code}`);
  }
}
