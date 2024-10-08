// src/app/rss-feed.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../../shared/models/article';

@Injectable({
  providedIn: 'root'
})
export class RssFeedService {

  private rssUrl = 'https://vnexpress.net/rss/tin-moi-nhat.rss';

  constructor(private http: HttpClient) { }

  // getRssFeed(): Observable<any> {
  //   return this.http.get(this.rssUrl, { responseType: 'text' }).pipe(
  //     map((data: string) => {
  //       const parser = new DOMParser();
  //       const xml = parser.parseFromString(data, 'application/xml');
  //       const items = xml.querySelectorAll('item');
  //       const results: any = [];
  //       items.forEach(item => {
  //         results.push({
  //           title: item.querySelector('title')?.textContent,
  //           link: item.querySelector('link')?.textContent,
  //           description: item.querySelector('description')?.textContent,
  //           pubDate: item.querySelector('pubDate')?.textContent
  //         });
  //       });
  //       return results;
  //     })
  //   );
  // }
  getRssFeed(): Observable<Article[]> {
    return this.http.get(this.rssUrl, { responseType: 'text' }).pipe(
      map(response => this.parseRssFeed(response))
    );
  }

  private parseRssFeed(xml: string): Article[] {
    // Parse the XML and return an array of articles
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const items = Array.from(doc.querySelectorAll('item'));

    return items.map(item => ({
      title: item.querySelector('title')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      image: item.querySelector('enclosure')?.getAttribute('url') || ''
    }));
  }

}
