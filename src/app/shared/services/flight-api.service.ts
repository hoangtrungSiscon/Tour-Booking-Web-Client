import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {

  readonly flightAPIUrl = "https://localhost:7000/api";

  constructor(private http:HttpClient) { }

  getFlightList():Observable<any[]>{
    return this.http.get<any>(this.flightAPIUrl+'/ThongTinChuyenBays');
  }

  getMostBookedFlight(): Observable<any> {
    return this.http.get<any[]>("https://localhost:7000/api/ChuyenBay/GetAll").pipe(
      map(chuyenBays => {
        const chuyenBayGroups: { [key: string]: any[] } = {};

        chuyenBays.forEach(chuyenBay => {
          const truncatedMaChuyenBay = chuyenBay.maChuyenBay.substring(6);
          if (!chuyenBayGroups[truncatedMaChuyenBay]) {
            chuyenBayGroups[truncatedMaChuyenBay] = [];
          }
          chuyenBayGroups[truncatedMaChuyenBay].push(chuyenBay);
        });

        const sortedGroups = Object.entries(chuyenBayGroups).sort((a, b) => b[1].length - a[1].length);

        // Handle ties by returning all top groups
        const topGroups = sortedGroups.filter(group => group[1].length === sortedGroups[0][1].length);

        // Flatten the array if there is only one top group
        const result = topGroups.length === 1 ? topGroups[0][1] : topGroups.map(group => group[1]).flat();

        return result;
      })
    );
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
