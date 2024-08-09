import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor (
    private title:Title
  ){}
  async ngOnInit() {
    this.title.setTitle("Error 404 - Không tìm thấy trang này")

  }
}
