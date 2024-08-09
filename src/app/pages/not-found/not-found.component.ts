import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor (
    private title:Title,
    @Inject(DOCUMENT) private dom: Document

  ){}
  async ngOnInit() {
    this.title.setTitle("Error 404 - Không tìm thấy trang này")
    const currentURL = 'https://flightdotclient.azurewebsites.net/not-found';
    this.updateCanonicalUrl(currentURL)
  }
  updateCanonicalUrl(url:string){
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement= this.dom.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
    if (element==null) {
      element= this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel','canonical')
    element.setAttribute('href',url)
  }
}
