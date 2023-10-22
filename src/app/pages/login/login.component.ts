import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  visible:boolean = true;
  changetype:boolean = true;
  hide = true;
  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
