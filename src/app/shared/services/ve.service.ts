import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VeService {

    // protected url: string = 'api/services/ve';
    protected url: string = "https://localhost:7000/api/services/ve";
    constructor(protected http: HttpClient) { }

    public getAll(): Observable<any> {
        return this.http.get(`${this.url}/getAll`, {});
    }

    public filterChiTietVe(input: any): Observable<any> {
        return this.http.post(`${this.url}/filterChiTietVe`, input);
    }

}