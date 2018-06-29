import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Client } from '../../common/entities/client';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
   templateUrl: 'cliForm.html'
})
export class CliForm {
   title: string = "";
   action: string = "";
   client: Client = new Client();

   constructor(
      public params: NavParams,
      public viewCtrl: ViewController,
      private fs: FirebaseService) {

      const cli = this.params.get('pin');
      if (cli.id) {
         this.client = cli;
         this.title = "Modificar cliente";
         this.action = "Grabar cambios";
      }
      else {
         this.title = "Nuevo cliente";
         this.action = "Agregar cliente";
      }
   }

   save() {
      this.client.fullName = this.client.lastName + ', ' + this.client.firstName;
      if (this.client.id) 
         this.fs.updateClient(this.client)
      else 
         this.fs.addClient(this.client)
      this.dismiss();
   }

   dismiss() {
      this.viewCtrl.dismiss();
   }
}

