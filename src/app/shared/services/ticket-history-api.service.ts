import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketHistoryApiService {
  readonly TicketAPIUrl = "https://localhost:7000/api/TicketHistory";
  constructor(private http:HttpClient) { }
  getTicketHistoryList (id:number){
    return this.http.get<any>(this.TicketAPIUrl + `/${id}`);
  }
}
