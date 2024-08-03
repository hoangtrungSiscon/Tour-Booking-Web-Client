import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {
  readonly accountAPIUrl = "https://flightdotapi.azurewebsites.net/api/TaiKhoan";

  constructor(private http:HttpClient) { }
  
  changePassword(data: any){
    return this.http.put(this.accountAPIUrl+`/ChangePassword`, data);
  }
}
