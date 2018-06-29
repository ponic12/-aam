import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigService } from '../../shared/services/config.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-opciones',
  templateUrl: 'opciones.html',
})
export class OpcionesPage {
  cfg:any = {maxDays:7, maxMoney:500}; 
  
  constructor(public navCtrl: NavController, private cs:ConfigService){
    this.cs.config.subscribe(o=>{
      this.cfg = o;
      console.log('maxDays: ', o.maxDays);
    }); 
  }
  
  save(){
    this.cs.updateConfig(this.cfg);
  }
}
