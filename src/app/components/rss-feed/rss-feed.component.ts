// src/app/components/rss-feed/rss-feed.component.ts
import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../../shared/services/rss.service';
import { Article } from '../../shared/models/article';

@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.scss']
})
export class RssFeedComponent implements OnInit {

  articles: Article[] = [];

  constructor(private rssFeedService: RssFeedService) { }

  ngOnInit(): void {
    this.rssFeedService.getRssFeed().subscribe((data: Article[]) => {
      this.articles = data.map((article: Article) => ({
        ...article,
        image: article.image || '../../../assets/icons8-error-globe-48.png' // Provide a default image if none is present
      }));
    });
  }

}
