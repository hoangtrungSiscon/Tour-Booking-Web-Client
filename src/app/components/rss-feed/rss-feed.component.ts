// src/app/rss-feed/rss-feed.component.ts
import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../../shared/services/rss.service';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})
export class RssFeedComponent implements OnInit {

  articles: any[] = [];

  constructor(private rssFeedService: RssFeedService) { }

  ngOnInit(): void {
    this.rssFeedService.getRssFeed().subscribe((data) => {
      this.articles = data;
    });
  }

}
