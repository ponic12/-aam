import { Component } from '@angular/core';

/**
 * Generated class for the SignupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  text: string;

  constructor() {
    console.log('Hello SignupComponent Component');
    this.text = 'Hello World';
  }

}
