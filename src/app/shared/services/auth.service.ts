import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/taiKhoan';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private maTaiKhoanSource = new BehaviorSubject<any | null>(null);
  private maTaiKhoanGet = this.maTaiKhoanSource.asObservable();
  private vaiTroSource = new BehaviorSubject<any | null>(null);
  private vaiTroGet = this.vaiTroSource.asObservable();
  protected url: string = 'https://localhost:7000/api/auth';
  constructor(protected http: HttpClient) {}

  public sendOtp(request: any): Observable<any> {
    return this.http.post(`${this.url}/sendOtp`, request);
  }
  public changePassword(request: any): Observable<any> {
    return this.http.post(`${this.url}/changePassword`, request);
  }

  public login(request: any): Observable<any> {
    return this.http.post(`${this.url}/login`, request, {
      responseType: 'text',
    });
  }

  public register(request: any): Observable<any> {
    return this.http.post(`${this.url}/register`, request);
  }

  public setUserId(id: number) {
    this.maTaiKhoanSource.next(id);
  }

  public getUserId(): Observable<any> {
    return this.maTaiKhoanGet;
  }

  public setVaiTro(vaiTro: number) {
    this.vaiTroSource.next(vaiTro);
  }

  public getVaiTro(): Observable<any> {
    return this.vaiTroGet;
  }
}
