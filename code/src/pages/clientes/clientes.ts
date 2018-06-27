import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../../common/services/firebase.service';

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
export class ClientesPage implements OnInit, OnDestroy {
   criteria: string;
   clients$: Observable<Client[]>;


   constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public alertCtrl: AlertController,
      private fs: FirebaseService) {
      console.log('ClientesPage constructor')
   }

   ngOnDestroy() {
      console.warn('ClientesPage destructor')
   }
   ngOnInit() {
      console.log('ClientesPage init')
      this.clients$ = this.fs.getClients('lastName', 'asc');
   }

   openClient(cli: Client): void {
      let modal = this.modalCtrl.create(CliForm, { 'pin': cli });
      modal.present();
   }
   mailClient(cli): void {
      window.location.href = "mailto:" + cli.email;
   }
   callClient(cli): void {
      window.location.href = "tel://" + cli.telephone;
   }
   deleteClient(cli) {
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