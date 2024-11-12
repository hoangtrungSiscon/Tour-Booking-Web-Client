import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(
    private title: Title,
    @Inject(DOCUMENT) private dom: Document
  ) {}

  async ngOnInit() {
    // Set the page title to reflect the 404 error page
    this.title.setTitle("Error 404 - Không tìm thấy trang này");

    // Set the canonical URL for SEO purposes
    const currentURL = 'https://flightdotclient.azurewebsites.net/not-found';
    this.updateCanonicalUrl(currentURL);
  }

  /**
   * Updates the canonical link tag in the document head to ensure proper SEO.
   * @param url - The URL to be set as the canonical link.
   */
  updateCanonicalUrl(url: string) {
    // Retrieve the head element
    const head = this.dom.getElementsByTagName('head')[0];
    
    // Try to find the existing canonical link element
    let element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
    
    // If the element doesn't exist, create a new one
    if (!element) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }

    // Set the canonical link attributes
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }
}
