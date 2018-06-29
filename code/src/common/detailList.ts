import { Component, OnInit  } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Movement } from './entities/movement';
import { DetForm } from './detForm';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  templateUrl:'detailList.html'
})
export class DetailList implements OnInit {
  title:string = "Detalle: ";
  showDetails: boolean = false;
  showList: boolean = false;
  clients$: Observable<any[]>;
  clientsTmp: Observable<any[]>;
  details$: Observable<any[]>;
  selClient:any;
  pin:any;
  mov:Movement;
  
  constructor(
    public platform: Platform,
    public params: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private fs: FirebaseService) {
      this.pin = this.params.get('pin');
      
      if (this.pin.id) {
        this.mov = this.pin;
        this.details$ = this.fs.getDetailsByMov(this.mov);
      }
      else 
        this.mov = new Movement();
        
      if (this.pin.fullName){
        this.showDetails = true;
        this.mov.fullName = this.pin.fullName;
        this.mov.idClient = this.pin.idClient;
      }
  }
  
  ngOnInit(){
    this.clients$ = this.fs.getClients('lastName','asc');
    this.clientsTmp = this.clients$;
  }

  setClient(cli){
    this.selClient = cli;
    this.mov.fullName = cli.fullName;
    this.mov.idClient = cli.id;
    this.showList = false;
    this.validateDetails();
  }
  validateDetails(){
    var res = (this.mov.cp) && (this.selClient != undefined) && (this.mov.fullName == this.selClient.fullName);
    this.showDetails = res;
  }
  getItems(ev: any) {
    this.validateDetails();
    let val = ev.target.value;

    var flag = (val && val.trim() != '');
    if (flag == true) {
      this.clientsTmp = this.clients$
        .map(cli => {
          return cli.filter(c => {
            return (c.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
      });
    } 
    this.showList = flag;
  }

  // calculateTotalDetails(){
  //   if (!this.details$) return;
  //   var total = 0;
  //   this.details$.subscribe((dets) => {
  //     dets.forEach((item) => {
  //       total = total + item.subtotal;   
  //     });
  //     if (this.mov.cp == 'CC') total = -total;
  //     this.mov.amount = total;
  //     this.fs.updateMovement(this.mov);
  //   });
  // }

  deleteMovement(m){
    let confirm = this.alertCtrl.create({
      title: 'Atencion',
      message: 'Esta seguro de eliminar este movimiento?',
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
            this.fs.deleteMovement(m);
            console.log('Cliente eliminado');
            this.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

  openDetail($event, d):void{
    var vm = this;
    vm.mov = this.mov;
    if (!this.mov.id){ // nuevo movimiento
      this.fs.addMovement(this.mov)
        .then(function(docRef) {
            console.log("New mov ID: ", docRef.id);
            vm.mov.id = docRef.id;
            vm.showDetWin(vm.mov, d);  
        })
        .catch(function(error) {
            console.error("Error Adding mov: ", error);
        });
    }
    else{
      this.fs.updateMovement(this.mov);
      vm.showDetWin(vm.mov, d);
    }
  }
  
  showDetWin(m,d){
    var pout = {mov:m, det:d};
    let modal = this.modalCtrl.create(DetForm, {'pin':pout});
    modal.onDidDismiss(data => {
      this.details$ = this.fs.getDetailsByMov(this.mov);
    });
    modal.present();
  }
  
  dismiss() {
    let data = { 'data': 'comming from detailList' };
    this.viewCtrl.dismiss(data);
  }
}

