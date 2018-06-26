import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { FirebaseService } from './services/firebase.service';
import { Detail } from './entities/detail';
import { Movement } from './entities/movement';

@Component({
  templateUrl:'detForm.html'
})
export class DetForm {
  // private detalle : FormGroup;
  title:string = "";
  flagNew:boolean = true;
  flagSaveOK:boolean = false;
  pin:any = {mov:{}, det:{}};

  constructor(
    public platform: Platform,
    public params: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    private fs: FirebaseService) {
      
    // this.detalle = this.formBuilder.group({
    //   product: ['', Validators.required],
    //   quantity: ['', Validators.required],
    //   price: ['', Validators.required]
    // });
    
    this.pin = this.params.get('pin');
    if (this.pin.det){
      this.flagNew = false;
      this.title = "Modificar detalle";
    }
    else{
      this.newDetail();
    }
  }
  
  disableAdd(){
    // Habilita: Cuando se guardan los cambios del detalle actual.
    // Deshabilita: Cuando se presiona el boton.
    var res = (!this.flagSaveOK); // && (this.flagNew); 
    return res;
  }
  disableSave(){
    // Habilita: Cuando detecta cambio en el detalle actual (nuevo o viejo)
    // Deshabilita: Cuando se guardan los cambios del detalle actual
    var res = (this.flagSaveOK) || 
      (this.pin.det.product == '') ||
      (this.pin.det.quantity == 0) ||
      (this.pin.det.price == '');
    return res;
  }
  disableDelete(){
    // Habilita: Cuando se esta editando un detalle existente.
    // Deshabilita: Cuando se esta creando un detalle nuevo.
    var res = (this.flagNew);
    return res;
  }
  
  calcSubTotal(){
    this.pin.det.subtotal = Number(this.pin.det.quantity)*Number(this.pin.det.price);
    return this.pin.det.subtotal;
  }
  
  newDetail(){
    this.pin.det = new Detail();
    this.pin.det.quantity = 0;
    this.pin.det.pricetag = 0;
    this.flagNew = true;
    this.flagSaveOK = false;
    this.title = "Nuevo detalle";
  }
  
  save(){
    if (this.flagNew == true) {
      this.fs.addDetail(this.pin.mov, this.pin.det);
    }
    else { 
      this.fs.updateDetail(this.pin.mov, this.pin.det);
    }
    this.flagSaveOK = true;
  }
  
  deleteDetail($event, key){
    let confirm = this.alertCtrl.create({
      title: 'Atencion',
      message: 'Seguro elimina detalle?',
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
            this.fs.deleteDetail(this.pin.det);
            console.log('Detalle eliminado');
            this.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

  dismiss() {
    let data = { 'data': 'comming from detForm' };
    this.viewCtrl.dismiss(data);
  }
}

