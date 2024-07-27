import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChuyenBayService {

    protected url: string = '/api/chuyenbay';
    constructor(protected http: HttpClient) { }

    public getAll(): Observable<any> {
        return this.http.get(`${this.url}/getAll`);
    }

    public filterChuyenBay(request: any): Observable<any> {
        return this.http.post(`${this.url}/filterChuyenBay`, request);
    }

    public getByCode(code: string | null): Observable<any> {
        return this.http.get(`${this.url}/GetByCode?code=${code}`);
    }
    public GetTop3NewestFlight(): Observable<any> {
        return this.http.get(`${this.url}/Top3NewestFlight`);
    }
}