import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Client } from '../../share/entities/client';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  templateUrl:'cliForm.html'
})
export class CliForm {
  title:string = "";
  action:string = "";
  pin:Client;
  client:Client = new Client();

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private fs: FirebaseService) {
      
    this.pin = this.params.get('pin');
    if (this.pin){
      this.client = this.pin;
      this.title = "Modificar cliente";
      this.action = "Grabar cambios";
    }
    else{
      this.title = "Nuevo cliente";
      this.action = "Agregar cliente";
    }
  }
  
  save(){
    this.client.fullName = this.client.lastName + ', ' + this.client.firstName;
    if (this.pin){
      this.fs.updateClient(this.client);
    }
    else{
      this.fs.addClient(this.client);
    }
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

