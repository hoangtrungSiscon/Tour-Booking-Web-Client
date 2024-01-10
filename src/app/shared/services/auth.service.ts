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
    });
  }
  getToken(): any {
    return localStorage.getItem('token');
  }
  storeData(token : any, mataikhoan : any, vaitro : any): void{
    // localStorage.setItem('token', token);
    // localStorage.setItem('mataikhoan', mataikhoan.toString())
    // localStorage.setItem('vaitro', vaitro.toString());
    const dataToStore = {
      token,
      mataikhoan,
      vaitro,
      expirationTime: new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7 ngày
    };
  
    // Lưu đối tượng vào local storage
    localStorage.setItem('userData', JSON.stringify(dataToStore));
  }
  getData(): { token: any, mataikhoan: any, vaitro: any } | null {
    const storedData = localStorage.getItem('userData');
  
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentTime = new Date().getTime();
  
      if (currentTime < parsedData.expirationTime) {
        // Dữ liệu vẫn còn hiệu lực
        return {
          token: parsedData.token,
          mataikhoan: parsedData.mataikhoan,
          vaitro: parsedData.vaitro
        };
      } else {
        // Dữ liệu đã hết hạn
        localStorage.removeItem('userData');
      }
    }
  
    // Không có dữ liệu hoặc dữ liệu đã hết hạn
    return null;
  }
  
  logout(): void {
    // localStorage.removeItem('token');
    // localStorage.removeItem('mataikhoan');
    // localStorage.removeItem('vaitro');
    localStorage.removeItem('userData');
  }
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }
  isLoggedIn(): boolean {
    const userData = this.getData();
    return !!userData
  }
  

  isUser(): boolean {
    // if (!localStorage.getItem('token')) return false;
    // else return localStorage.getItem('vaitro') == '1';
    const userData = this.getData();
    return !!userData && userData.vaitro == '1';
  }
  isAdmin(): boolean {
    // if (!localStorage.getItem('token')) return false;
    // else return localStorage.getItem('vaitro') == '0';
    const userData = this.getData();
    return !!userData && userData.vaitro == '0';
  }
  
  public thisAccountId() : number{
    // return !localStorage.getItem('mataikhoan') ? 0 : parseInt(localStorage.getItem('mataikhoan')!)
    const userData = this.getData();
    return !!userData ? parseInt(userData.mataikhoan) : 0
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
