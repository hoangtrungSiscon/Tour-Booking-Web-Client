import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneApiService {

  readonly PlaneAPIUrl = "/api";

  constructor(private http:HttpClient) { }

  getPlaneList():Observable<any[]>{
    return this.http.get<any>(this.PlaneAPIUrl+'/Maybays');
  }

  getPlaneListById(id:string):Observable<any[]>{
    return this.http.get<any>(this.PlaneAPIUrl+`/Maybays/${id}`);
  }

  addPlane(data: any){
    return this.http.post(this.PlaneAPIUrl+'/Maybays', data);
  }

  updatePlane(id: string, data: any){
    return this.http.put(this.PlaneAPIUrl+`/Maybays/${id}`, data);
  }

  deletePlane(id: string){
    return this.http.delete(this.PlaneAPIUrl+`/Maybays/${id}`);
  }
}
