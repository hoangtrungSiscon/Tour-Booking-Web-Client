import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MailchimpService {
  private apiUrl = 'https://us22.api.mailchimp.com/3.0/lists/1d043ea14e/members';
  private apiKey = '66766b530d88886b075697636ac8f03d-us22';

  constructor(private http: HttpClient) {}

  subscribeToList(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa('anystring:' + this.apiKey)}`
    });

    const body = {
      email_address: email,
      status: 'subscribed'
    };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError(error => {
        console.error('Subscription failed', error);
        return throwError('Subscription failed.');
      })
    );
  }
}
