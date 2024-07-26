import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketApiService {
  readonly TicketAPIUrl = "https://flightdotapi.azurewebsites.net/api";
  constructor(private http:HttpClient) { }

  getTicketList():Observable<any[]> {
    // return this.http.get<any>(this.TicketAPIUrl + '/KhachHangs');
    return this.http.get<any>(this.TicketAPIUrl + '/ThongTinVes');
  }
  getCurrentMonthTotalRevenue(): Observable<number> {
    return this.getTicketList().pipe(
      map(tickets => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

        const currentMonthTickets = tickets.filter(ticket => {
          const ticketDate = new Date(ticket.ngayDatVe);
          return ticketDate.getMonth() + 1 === currentMonth;
        });

        const totalRevenue = currentMonthTickets.reduce((acc, ticket) => acc + ticket.tongGia, 0);
        return totalRevenue;
      })
    );
  }
  getPreviousMonthTotalRevenue(): Observable<number> {
    return this.getTicketList().pipe(
      map(tickets => {
        const previoustDate = new Date();
        const previousMonth = previoustDate.getMonth(); // Months are zero-based

        const previousMonthTickets = tickets.filter(ticket => {
          const ticketDate = new Date(ticket.ngayDatVe);
          return ticketDate.getMonth() +1  === previousMonth;
        });

        const totalpreviousRevenue = previousMonthTickets.reduce((acc, ticket) => acc + ticket.tongGia, 0);
        console.log(totalpreviousRevenue);
        
        return totalpreviousRevenue;
      })
    );
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
