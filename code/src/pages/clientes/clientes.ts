import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CliForm } from './cliForm';
import { Client } from '../../common/entities/client';

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html'
})
export class ClientesPage implements OnInit {
  criteria: string;
  clients$: Observable<Client[]>;
    
  
  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fs: FirebaseService){
      
  }
  
  ngOnInit(){
    this.clients$ = this.fs.getClients('lastName', 'asc');
  }

  openClient($event, cli:Client):void{
    var pout = cli;
    let modal = this.modalCtrl.create(CliForm, {'pin':pout});
    modal.present();
  }
  
  mailClient($event, cli):void{
    window.location.href="mailto:"+cli.email;
  }  
  callClient($event, cli):void{
    window.location.href="tel://"+cli.telephone;
  }
  
  deleteClient($event, cli){
    console.log(cli);
    let confirm = this.alertCtrl.create({
      title: 'Atencion',
      message: 'Esta seguro de eliminar este cliente?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancelacion de eliminacion');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.fs.deleteClient(cli);
            console.log('Cliente eliminado');
          }
        }
      ]
    });
    confirm.present();
  }
}