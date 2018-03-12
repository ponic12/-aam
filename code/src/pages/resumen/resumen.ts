import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { ConfigService } from '../../services/config.service';
import { Movimientos} from '../../share/movimientos';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage implements OnInit {
  clients$: Observable<any[]>;
  
  private sdName:string = 'desc';

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fs: FirebaseService){ 
  }
  
  ngOnInit(){
    this.clients$ = this.fs.getClients('fullName','asc');
  }

  sortByName(){
    this.sdName = this.toggleSortDir(this.sdName);
    this.clients$ = this.fs.getClients('fullName', this.sdName);
  }
  
  toggleSortDir(sd){
    if (sd == 'desc') sd = 'asc'
    else sd = 'desc';
    return sd;
  }

  openMovements($event, cli):void{
    var pout = {'cli':cli, 'type':'RC'};
    let modal = this.modalCtrl.create(Movimientos, {'pin':pout});
    modal.onDidDismiss(data => {
      this.ngOnInit();
    });
    modal.present();
  }
}
