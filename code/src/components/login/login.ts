import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {

  text: string;

  constructor() {
    console.log('Hello LoginComponent Component');
    this.text = 'Hello World';
  }
  
  ngOnInit(){
    
  }
}
