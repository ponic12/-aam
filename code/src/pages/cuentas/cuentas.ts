import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { ConfigService } from '../../services/config.service';
import { Movimientos} from '../../common/movimientos';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html',
})
export class CuentasPage implements OnInit {
  clients$: Observable<any[]>;
  cfg:any = {maxDays:0, maxMoney:0};
  
  private sdName:string = 'desc';
  private sdBal:string = 'desc';

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fs: FirebaseService, 
    private cs:ConfigService){ 
      this.cs.config.subscribe(x=>{
        this.cfg = x;
        console.log('maxDays: ', x.maxDays);
      }); 
  }
  
  ngOnInit(){
    this.clients$ = this.fs.getClientsAccounts('fullName','asc');
  }

  sortByName(){
    this.sdName = this.toggleSortDir(this.sdName);
    this.clients$ = this.fs.getClientsAccounts('fullName', this.sdName);
  }
  
  sortByBal(){
    this.sdBal = this.toggleSortDir(this.sdBal);
    this.clients$ = this.fs.getClientsAccounts('balance',this.sdBal);
  }
  
  toggleSortDir(sd){
    if (sd == 'desc') sd = 'asc'
    else sd = 'desc';
    return sd;
  }

  evalTimeAlert(cli){
    var op = .2;
    if (cli.balance<0){
      let today = new Date().getTime();
      let maxDays = this.cfg.maxDays;
      let difTime = Math.abs(today - cli.lastDatePaid);
      var difDays = Math.ceil(difTime / (1000 * 3600 * 24)); 
      if (difDays > maxDays) op = 1;
    }
    let st = {
      'opacity':op,
      'margin-top': '-5px',
      'width': '24px'
    };
    return st;
  }
  
  evalMoneyAlert(cli){
    var op = .2;
    if (cli.balance<0){
      let maxMoney = this.cfg.maxMoney;
      if (cli.balance < -maxMoney) op = 1;
    }
    let st = {
      'opacity':op,
      'margin-top': '-5px',
      'width': '24px'
    };
    return st;
  }

  openMovements($event, cli):void{
    var pout = {'cli':cli, 'type':'CC'};
    let modal = this.modalCtrl.create(Movimientos, {'pin':pout});
    modal.onDidDismiss(data => {
      this.ngOnInit();
    });
    modal.present();
  }
}
