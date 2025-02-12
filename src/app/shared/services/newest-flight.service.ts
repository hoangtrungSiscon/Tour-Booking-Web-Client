import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewestFlightService {

  readonly flightAPIUrl = "https://localhost:7000/api/ChuyenBay/Top3NewestFlight";
  constructor(private http:HttpClient) { }
  getTop3NewestFlight(){
    return this.http.get<any>(this.flightAPIUrl);
  }
}
