import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {

  readonly flightAPIUrl = "https://localhost:7000/api";

  constructor(private http:HttpClient) { }

  getFlightList(MaChuyenBay: string, NoiXuatPhat: string, NoiDen: string, NgayXuatPhat: string):Observable<any[]>{
    const params = new HttpParams()
    .set('MaChuyenBay', MaChuyenBay)
    .set('NoiXuatPhat', NoiXuatPhat)
    .set('NoiDen', NoiDen)
    .set('NgayXuatPhat', NgayXuatPhat);
    return this.http.get<any>(this.flightAPIUrl+'/ThongTinChuyenBays', { params });
  }

  getFlightListById(id:string):Observable<any[]>{
    return this.http.get<any>(this.flightAPIUrl+`/ThongTinChuyenBays/${id}`);
  }

  addFlight(data: any){
    return this.http.post(this.flightAPIUrl+'/ThongTinChuyenBays', data);
  }

  updateFlight(id: string, data: any){
    return this.http.put(this.flightAPIUrl+`/ThongTinChuyenBays/${id}`, data);
  }

  deleteFlight(id: string){
    return this.http.delete(this.flightAPIUrl+`/ThongTinChuyenBays/${id}`);
  }
}
