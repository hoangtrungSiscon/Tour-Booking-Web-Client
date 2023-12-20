import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../models/taiKhoan';
import { JsonPipe } from '@angular/common';

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
  private userToken = '';
  public login(request: any): Observable<any> {
    return this.http.post(`${this.url}/login`, request, {
      responseType: 'text',
    }).pipe(
      // tap((data) => {
      //   localStorage.setItem('token', data[0]);
      // })
    );
  }
  getToken(): any {
    return localStorage.getItem('token');
  }
  storeData(token : any, mataikhoan : any, vaitro : any): void{
    localStorage.setItem('token', token);
    localStorage.setItem('mataikhoan', mataikhoan.toString())
    localStorage.setItem('vaitro', vaitro.toString());
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('mataikhoan');
    localStorage.removeItem('vaitro');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
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
