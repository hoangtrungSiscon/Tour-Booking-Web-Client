import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketApiService {
  readonly TicketAPIUrl = "https://localhost:7000/api";
  constructor(private http:HttpClient) { }

  getTicketList():Observable<any[]> {
    // return this.http.get<any>(this.TicketAPIUrl + '/KhachHangs');
    return this.http.get<any>(this.TicketAPIUrl + '/ThongTinVes');
  }
//   getTicketListById(id:string):Observable<any[]>{
//     return this.http.get<any>(this.TicketAPIUrl +`/ThongTinkhachhangs/${id}`);
//   }
//   addTicket(data:any){
//     return this.http.post(this.TicketAPIUrl + '/ThongTinkhachhangs', data);
//   }

//   updateTicket(id:number|string, data:any){
//     return this.http.put(this.TicketAPIUrl + `/ThongTinkhachhangs/${id}`, data);
//   }

//   deleteTicket(id:number|string, data:any){
//     return this.http.delete(this.TicketAPIUrl + `/ThongTinkhachhangs/${id}`); 
//   }
}
