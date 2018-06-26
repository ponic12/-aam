import { Component, OnInit, OnDestroy, AfterViewInit, trigger, transition, state, style, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseService } from '../../common/services/firebase.service';
import { DetailList} from '../../common/detailList';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
  animations:[
    trigger('bounce',[
      state('*', style({
        transform:'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform:'translateX(0)', offset:0}),
        style({transform:'translateX(-65px)', offset:.3}),
        style({transform:'translateX(0)', offset:1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform:'translateX(0)', offset:0}),
        style({transform:'translateX(65px)', offset:.3}),
        style({transform:'translateX(0)', offset:1})
      ]))),
    ])
  ]
})
export class VentasPage implements OnInit, OnDestroy, AfterViewInit {
  state:string='initState';
  
  today:number=new Date().getTime();
  totCC:number=0;
  totEF:number=0;
  totTG:number=0;
  totPC:number=0;
  totDay:number=0;
  sales$: Observable<any[]>;
  
  private sdDate:string = 'desc';
  private sdName:string = 'desc';
  private sdCP:string = 'desc';
  private sdAmt:string = 'desc';

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fs: FirebaseService){
    
  }
  
  ngOnInit(){
    this.sales$=this.fs.getSalesByDate(this.today, 'fullName', 'asc');
    this.calcTotales();
  }
  ngAfterViewInit() {
    // this.toolsService.showTools(true);
    // this.toolsService.showDatePicker(true);
  }
  ngOnDestroy() {
    // this.toolsService.showTools(false);
    // this.toolsService.showDatePicker(false);
  }
  
   sortByDate(){
    this.sdDate = this.toggleSortDir(this.sdDate);
    this.sales$ = this.fs.getSalesByDate(this.today, 'datetime', this.sdDate);
  }

  sortByName(){
    this.sdName = this.toggleSortDir(this.sdName);
    this.sales$ = this.fs.getSalesByDate(this.today, 'fullName',this.sdName);
  }
  
  sortByCP(){
    this.sdCP = this.toggleSortDir(this.sdCP);
    this.sales$ = this.fs.getSalesByDate(this.today, 'cp',this.sdCP);
  }
  
  sortByAmount(){
    this.sdAmt = this.toggleSortDir(this.sdAmt);
    this.sales$ = this.fs.getSalesByDate(this.today, 'amount',this.sdAmt);
  }
  
  toggleSortDir(sd){
    if (sd == 'desc') sd = 'asc'
    else sd = 'desc';
    return sd;
  }
  
  
  openDetails($event, m):void{
    var pout = {};
    if (m) pout = m;
    let modal = this.modalCtrl.create(DetailList, {'pin':pout});
    modal.onDidDismiss(data => {
      this.ngOnInit();
    });
    modal.present();
  }
  
  deleteSale($event, m){
    let confirm = this.alertCtrl.create({
      title: 'Atencion',
      message: 'Esta seguro de eliminar esta venta?',
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
            //this.fs.deleteMovement(m);
            console.log('Venta eliminada');
          }
        }
      ]
    });
    confirm.present();
  }
  
  calcTotales(){
    if (!this.sales$) return 0;
  
    this.totDay = 0;
    this.totCC = 0;
    this.totEF = 0;
    this.totTG = 0;
    this.totPC = 0;
    
    this.sales$.subscribe((ss) => setTimeout(()=>{
      ss.forEach((item) => {
        if (item.cp == 'CC') this.totCC = this.totCC + Number(item.amount);
        if (item.cp == 'TG') this.totTG = this.totTG + Number(item.amount);
        if (item.cp == 'PC') this.totPC = this.totPC + Number(item.amount);
        if (item.cp == 'EF') this.totEF = this.totEF + Number(item.amount);
      });
      this.totDay = this.totEF + this.totTG + this.totPC; // + this.totCC; 
    },100));
  }
  
  
  animationDone(){
    // En el HTML .... [@bounce]="state"
    // En el HTML .... (@bounce.done)="animationDone()"
    //this.state = 'rightSwipe'; // 'leftSwipe'
    this.state = 'initState';
  }
}
  
  