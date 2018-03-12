import { Component, OnInit } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

import { FirebaseService } from '../services/firebase.service';
import { DetailList} from './detailList';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'movimientos.html',
})
export class Movimientos implements OnInit {
  movements$: Observable<any[]>;
  pin:any = {'type':{}, 'cli':{}};
  
  vm:any = {'moves':[]};
      
  private sdDate:string = 'desc';
  private sdCP:string = 'desc';
  private sdAmt:string = 'desc';
  
  constructor(
    public modalCtrl: ModalController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private pdfmake: PdfmakeService,
    private fs: FirebaseService){ 
  }
  
  ngOnInit(){
    this.pin = this.params.get('pin');
    this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'datetime', 'desc');
    //this.calculateTotalMoves();
    // let docDefinition: any = { content: 'This is an sample PDF printed with pdfMake' };
    //     pdfMake.createPdf(docDefinition).open();
  }
  
  
  
  sortByDate(){
    this.sdDate = this.toggleSortDir(this.sdDate);
    this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'datetime', this.sdDate);
  }

  sortByCP(){
    this.sdCP = this.toggleSortDir(this.sdCP);
    this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'cp',this.sdCP);
  }
  
  sortByAmount(){
    this.sdAmt = this.toggleSortDir(this.sdAmt);
    this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'amount',this.sdAmt);
  }
  
  toggleSortDir(sd){
    if (sd == 'desc') sd = 'asc'
    else sd = 'desc';
    return sd;
  }
  
  openDetails($event, m):void{
    var pout = {'idClient':this.pin.cli.id, 'fullName':this.pin.cli.fullName};
    if (m) pout = m;
    let modal = this.modalCtrl.create(DetailList, {'pin':pout});
    modal.onDidDismiss(data => {
      this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'datetime', 'desc');
    });
    modal.present();
  }
   
    
  // calculateTotalMoves(){
  //   if (!this.movements$) return;
  //   var total = 0;
  //   var balance = 0;
  //   let sub = this.movements$.subscribe((movs) => {
  //     movs.forEach((item) => {
  //       total = total + item.amount;
  //       if ((item.cp == 'CC')||(item.cp == 'PC'))
  //         balance = balance + item.amount;
  //     });
  //     console.log('calculateTotalMoves call....');
  //     this.pin.cli.sales = total;
  //     this.pin.cli.balance = balance;
  //     this.fs.updateClient(this.pin.cli);
  //     this.vm.moves = movs;
  //     sub.unsubscribe();
  //   });
  // }
  
  formatDate(time):string{
    var d = new Date(time);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var str = curr_date + "-" + curr_month + "-" + curr_year;
    console.log(str);
    return str;
  }
  downloadPdf(){
    this.pdfmake.docDefinition = {content:[] };
    var tipo = "Cuenta Corriente";
    if (this.pin.type == 'RC') tipo = "Resumen de Cuenta";
    this.pdfmake.configureStyles({ 
      header: { fontSize: 22, bold: true }
    });
    
    var docDef = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
     
            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            ]
          }
        }
      ]
    };
    this.pdfmake.docDefinition = docDef;
    // this.pdfmake.addText('Movimientos '+ tipo + ' - ' +this.pin.cli.fullName);
    // this.pdfmake.addText(' ');
    // this.pdfmake.addText(' ');
  
    // // Create Headers cells
    // const header1 = new Cell('Fecha');
    // const header2 = new Cell('CP');
    // const header3 = new Cell('Monto');
 
    // // Create headers row
    // const headerRows = new Row([header1, header2, header3]);
    // const lst:any[]=[];
    
    // this.vm.moves.forEach((o) => {
    //     console.log('antes: ',o);
    //     let row = new Row([new Cell(this.formatDate(o.datetime)), new Cell(o.cp,'tipopago'), new Cell('$' + o.amount, 'money')]);
    //     lst.push(row);
    //   });
    // const widths = ['*', 50, '*'];
    // const table = new Table(headerRows, lst, widths);
    // this.pdfmake.addTable(table);
    // var customName="Movs_" + this.pin.cli.lastName;
    //this.pdfmake.download(customName);
    this.pdfmake.open();
    
    
    // pdfMake.createPdf(YOUR_DEFINITION_HERE).getBlob(buffer => {
    //   this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
    //     .then(dirEntry => {
    //       this.file.getFile(dirEntry, 'test1.pdf', { create: true })
    //         .then(fileEntry => {
    //           fileEntry.createWriter(writer => {
    //             writer.onwrite = () => {
    //               this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
    //                 .then(res => { })
    //                 .catch(err => {
    //                   const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok'] });
    //                   alert.present();
    //                 });
    //             }
    //             writer.write(buffer);
    //           })
    //         })
    //         .catch(err => {
    //           const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
    //           alert.present();
    //         });
    //     })
    //     .catch(err => {
    //       const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
    //       alert.present();
    //     });
    // });
  }
  

  dismiss() {
    let data = { 'data': 'comming from movimientos' };
    this.viewCtrl.dismiss(data);
  }
}


  
  // generatePdfDemo(){

  //   // Configure text styles  
  //   this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
 
  //   // Add a text with style
  //   this.pdfmake.addText('This is a header, using header style', 'header');
 
  //   // Add simple text
  //   this.pdfmake.addText('This is an sample PDF printed with pdfMake');
 
  //   // Add large text
  //   this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');
 
  //   // Array with colums
  //   const columns = [
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
  //   ];
 
  //   // Add columns
  //   this.pdfmake.addColumns(columns);
 
  //   // List to add
  //   const list1 = ['item 1', 'item 2', 'item 3'];
  //   const list2 = ['item 1', 'item 2', 'item 3'];
  //   const list3 = ['item 1', 'item 2', 'item 3'];
  //   const list4 = ['item 1', 'item 2', 'item 3'];
 
  //   // Adding unordered list
  //   this.pdfmake.addUnorderedlist(list1);
 
  //   // Adding ordered list
  //   this.pdfmake.addOrderedList(list2);
 
  //   // Adding reversed oredered list
  //   this.pdfmake.addOrderedList(list3, true);
 
  //   // Adding ordered list starting at 50
  //   this.pdfmake.addOrderedList(list4, false, 50);
 
  //   // Add image from url
  //   this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png');
 
  //   // Add image from url using custom width and height.
  //   this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 300, 150);
 
  //   // Add image from localhost and using width
  //   this.pdfmake.addImage('http://localhost:4200/assets/daniel.jpg', 200);    
  // }
