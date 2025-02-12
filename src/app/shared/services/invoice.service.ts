import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  protected url: string = 'https://localhost:7000/api/Hoadons';
  constructor(protected http: HttpClient) { }

  public getInvoiceById(id: any, accountId: any): Observable<any> {
    const params = new HttpParams()
    .set('id', id)
    .set('accountId',accountId)
    return this.http.get<any>(this.url+`/GetInvoiceById/${id}/${accountId}`, {params});
  }

  public getInvoicesByAccountId(id: any): Observable<any> {
    return this.http.get<any>(this.url+`/GetInvoicesByAccountId/${id}`, id);
  }
  public getFlightInfoOfInvoice(machuyenbay: any): Observable<any> {
    return this.http.get<any>(this.url+`/GetFlightInfoOfInvoice/${machuyenbay}`, machuyenbay);
  }
  public updatePayStatus(id: any, accountId: any, kieuthanhtoan: string, magiaodich: string): Observable<any> {
    const params = new HttpParams()
    .set('id', id)
    .set('accountId',accountId)
    .set('kieuthanhtoan',kieuthanhtoan)
    .set('magiaodich',magiaodich)
    return this.http.put(this.url+`/UpdatePayStatus/${id}/${accountId}/${kieuthanhtoan}/${magiaodich}`, {params});
  }
}
