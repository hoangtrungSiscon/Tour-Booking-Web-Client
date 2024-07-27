import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VeService {

    protected url: string = 'https://flightdotapi.azurewebsites.net/api/services/ve';
    constructor(protected http: HttpClient) { }

    public getAll(): Observable<any> {
        return this.http.get(`${this.url}/getAll`, {});
    }

    public filterChiTietVe(input: any): Observable<any> {
        return this.http.post(`${this.url}/filterChiTietVe`, input);
    }

}