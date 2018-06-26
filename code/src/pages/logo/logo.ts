import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-logo',
  templateUrl: 'logo.html',
})
export class LogoPage {

  constructor(public navCtrl: NavController){
     console.log('LogoPage constructor')
  }
}
