import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
// @Output isLogin
@Output() isLogin = new EventEmitter();

  login(){
    console.log("login Success ....")
    this.isLogin.emit(true);
  }
}
