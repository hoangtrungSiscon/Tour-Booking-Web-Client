import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailchimpService {
  private url: string = 'https://localhost:7000/api/Mailchimp';

  constructor(private http: HttpClient) { }

  subscribe(email: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    const body = {
      email: email
    };

    return this.http.post(this.url+'/subscribe', body, { headers: headers });
  }
}