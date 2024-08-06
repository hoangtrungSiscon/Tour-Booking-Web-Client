import { PaymentInfo } from './../models/paymentInfo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnpayService {

  protected url: string = 'https://flightdotapi.azurewebsites.net/api/VnPay';

  constructor(protected http: HttpClient) { }

  public createPaymentURL(paymentInfo: PaymentInfo, id: number): Observable<any> {
    const params = new HttpParams()
    .set('OrderType', paymentInfo.orderType)
    .set('Amount', paymentInfo.amount)
    .set('OrderDescription', paymentInfo.orderDescription)
    .set('Name', paymentInfo.name);
    return this.http.get<any>(this.url+`/CreatePaymentUrl?id=${id}`, {params});
  }
}
