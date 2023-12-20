import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestApiService {
  readonly guestAPIUrl = "https://localhost:7000/api";
  constructor(private http:HttpClient) { }

  getGuestList():Observable<any[]> {
    // return this.http.get<any>(this.guestAPIUrl + '/KhachHangs');
    return this.http.get<any>(this.guestAPIUrl + '/ThongTinkhachhangs');
  }
  getGuest():Observable<any[]> {
    // return this.http.get<any>(this.guestAPIUrl + '/KhachHangs');
    return this.http.get<any>(this.guestAPIUrl + '/KhachHangs');
  }
  getGuestListById(id:number):Observable<any[]>{
    return this.http.get<any>(this.guestAPIUrl +`/ThongTinkhachhangs/${id}`);
  }
  addGuest(data:any){
    return this.http.post(this.guestAPIUrl + '/ThongTinkhachhangs', data);
  }

  updateGuest(id:number|string, data:any){
    return this.http.put(this.guestAPIUrl + `/ThongTinkhachhangs/${id}`, data);
  }

  deleteGuest(id:number|string, data:any){
    return this.http.delete(this.guestAPIUrl + `/ThongTinkhachhangs/${id}`); 
  }
}