import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {
    private apiUrl = '/mailchimpapi/3.0/lists/1d043ea14e/members';
    private apiKey = '3fa1cbf5ff7aac166eca0ed3fd7e86a5-us22';    

  constructor(private http: HttpClient) { }

  subscribeToList(email: string): Observable<any> {
    const data = {
      email_address: email,
      status: 'subscribed'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa('anystring:' + this.apiKey)}`
    });

    return this.http.post(this.apiUrl,data, { headers });
  }
}