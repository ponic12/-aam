webpackJsonp([0],{

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfigService = (function () {
    function ConfigService(afs) {
        this.afs = afs;
        this.configRef = this.afs.doc('config/settings');
        this.config = this.configRef.valueChanges();
    }
    ConfigService.prototype.updateConfig = function (s) {
        this.configRef.update(s)
            .then(function () {
            console.log("Update config ok");
        })
            .catch(function (error) {
            console.error("Error Updating config: ", error);
        });
    };
    ConfigService.prototype.handleError = function (error) {
        console.log('Error: ', error);
    };
    return ConfigService;
}());
ConfigService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
], ConfigService);

//# sourceMappingURL=config.service.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Movimientos; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_pdf_make_pdfmake_pdfmake_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detailList__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Movimientos = (function () {
    function Movimientos(modalCtrl, platform, params, viewCtrl, pdfmake, fs) {
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.pdfmake = pdfmake;
        this.fs = fs;
        this.pin = { 'type': {}, 'cli': {} };
        this.vm = { 'moves': [] };
        this.sdDate = 'desc';
        this.sdCP = 'desc';
        this.sdAmt = 'desc';
    }
    Movimientos.prototype.ngOnInit = function () {
        this.pin = this.params.get('pin');
        this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'datetime', 'desc');
        //this.calculateTotalMoves();
        // let docDefinition: any = { content: 'This is an sample PDF printed with pdfMake' };
        //     pdfMake.createPdf(docDefinition).open();
    };
    Movimientos.prototype.sortByDate = function () {
        this.sdDate = this.toggleSortDir(this.sdDate);
        this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'datetime', this.sdDate);
    };
    Movimientos.prototype.sortByCP = function () {
        this.sdCP = this.toggleSortDir(this.sdCP);
        this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'cp', this.sdCP);
    };
    Movimientos.prototype.sortByAmount = function () {
        this.sdAmt = this.toggleSortDir(this.sdAmt);
        this.movements$ = this.fs.getMovsByCli(this.pin.cli.id, 'amount', this.sdAmt);
    };
    Movimientos.prototype.toggleSortDir = function (sd) {
        if (sd == 'desc')
            sd = 'asc';
        else
            sd = 'desc';
        return sd;
    };
    Movimientos.prototype.openDetails = function ($event, m) {
        var _this = this;
        var pout = { 'idClient': this.pin.cli.id, 'fullName': this.pin.cli.fullName };
        if (m)
            pout = m;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__detailList__["a" /* DetailList */], { 'pin': pout });
        modal.onDidDismiss(function (data) {
            _this.movements$ = _this.fs.getMovsByCli(_this.pin.cli.id, 'datetime', 'desc');
        });
        modal.present();
    };
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
    Movimientos.prototype.formatDate = function (time) {
        var d = new Date(time);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        var str = curr_date + "-" + curr_month + "-" + curr_year;
        console.log(str);
        return str;
    };
    Movimientos.prototype.downloadPdf = function () {
        this.pdfmake.docDefinition = { content: [] };
        var tipo = "Cuenta Corriente";
        if (this.pin.type == 'RC')
            tipo = "Resumen de Cuenta";
        this.pdfmake.configureStyles({
            header: { fontSize: 22, bold: true }
        });
        var docDef = {
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 'auto', 100, '*'],
                        body: [
                            ['First', 'Second', 'Third', 'The last one'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                            [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
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
    };
    Movimientos.prototype.dismiss = function () {
        var data = { 'data': 'comming from movimientos' };
        this.viewCtrl.dismiss(data);
    };
    return Movimientos;
}());
Movimientos = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/share/movimientos.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Detalle de movimientos\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="close-circle" class="closeIcon" showWhen="android,windows,mobileweb,core"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="bkg" >\n  <ion-grid>\n    <ion-row>\n      <ion-col col-8 style="font-size:16px">\n        {{pin.cli.fullName}}\n      </ion-col>\n      <ion-col col-4 style="font-size:16px">\n        <div *ngIf="pin.type==\'RC\'">Total: {{pin.cli.sales | currency:\'USD\':true:\'1.0-0\'}}</div>\n        <div *ngIf="pin.type==\'CC\'">Total: {{pin.cli.balance | currency:\'USD\':true:\'1.0-0\'}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid class="gridInfo"  >\n    <ion-row class class="rowHeader">\n      <ion-col col-6 (click)="sortByDate()">Fecha</ion-col>\n      <ion-col col-2 (click)="sortByCP()">CP</ion-col>\n      <ion-col col-4 (click)="sortByAmount()" style="text-align:right">Monto</ion-col>\n    </ion-row> \n    <div *ngFor="let mov of movements$ | async">\n      <ion-row  *ngIf="((pin.type==\'CC\')&&((mov.cp == \'CC\' )||(mov.cp == \'PC\')))||(pin.type == \'RC\')"\n        class="rowInfo"\n        (click)="openDetails($event,mov)"\n        [style.background]="(mov.amount >=0) ? \n        \'linear-gradient(to bottom, #ded 0%, #ded 88%, #cdc 100%)\':\n        \'linear-gradient(to bottom, #edd 0%, #edd 88%, #dcc 100%)\'">\n        <ion-col col-6 >{{mov.datetime | date:\'dd-MM-yyyy  HH:mm\'}}</ion-col>\n        <ion-col col-2 >{{mov.cp}}</ion-col>\n        <ion-col col-4 style="text-align:right">{{mov.amount | currency:\'USD\':true:\'1.0-0\'}}</ion-col>\n      </ion-row>\n    </div>\n  </ion-grid>  \n  \n  <ion-fab right bottom>\n    <button ion-fab primary mini (click)="openDetails()">\n      <span style="font-size:30px">+</span>\n    </button>\n  </ion-fab>\n  <ion-fab left bottom>\n    <button ion-fab primary mini (click)="downloadPdf()">\n      <ion-icon name="print"></ion-icon>\n    </button>\n  </ion-fab>  \n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/share/movimientos.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ng_pdf_make_pdfmake_pdfmake_service__["a" /* PdfmakeService */],
        __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */]])
], Movimientos);

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
//# sourceMappingURL=movimientos.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_movement__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detForm__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DetailList = (function () {
    function DetailList(platform, params, modalCtrl, alertCtrl, viewCtrl, fs) {
        this.platform = platform;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.fs = fs;
        this.title = "Detalle: ";
        this.showDetails = false;
        this.showList = false;
        this.pin = this.params.get('pin');
        if (this.pin.id) {
            this.mov = this.pin;
            this.details$ = this.fs.getDetailsByMov(this.mov);
        }
        else
            this.mov = new __WEBPACK_IMPORTED_MODULE_3__entities_movement__["a" /* Movement */]();
        if (this.pin.fullName) {
            this.showDetails = true;
            this.mov.fullName = this.pin.fullName;
            this.mov.idClient = this.pin.idClient;
        }
    }
    DetailList.prototype.ngOnInit = function () {
        this.clients$ = this.fs.getClients('lastName', 'asc');
        this.clientsTmp = this.clients$;
    };
    DetailList.prototype.setClient = function (cli) {
        this.selClient = cli;
        this.mov.fullName = cli.fullName;
        this.mov.idClient = cli.id;
        this.showList = false;
        this.validateDetails();
    };
    DetailList.prototype.validateDetails = function () {
        var res = (this.mov.cp) && (this.selClient != undefined) && (this.mov.fullName == this.selClient.fullName);
        this.showDetails = res;
    };
    DetailList.prototype.getItems = function (ev) {
        this.validateDetails();
        var val = ev.target.value;
        var flag = (val && val.trim() != '');
        if (flag == true) {
            this.clientsTmp = this.clients$
                .map(function (cli) {
                return cli.filter(function (c) {
                    return (c.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
            });
        }
        this.showList = flag;
    };
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
    DetailList.prototype.deleteMovement = function (m) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Atencion',
            message: 'Esta seguro de eliminar este movimiento?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Cancelacion de eliminacion');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.fs.deleteMovement(m);
                        console.log('Cliente eliminado');
                        _this.dismiss();
                    }
                }
            ]
        });
        confirm.present();
    };
    DetailList.prototype.openDetail = function ($event, d) {
        var vm = this;
        vm.mov = this.mov;
        if (!this.mov.id) {
            this.fs.addMovement(this.mov)
                .then(function (docRef) {
                console.log("New mov ID: ", docRef.id);
                vm.mov.id = docRef.id;
                vm.showDetWin(vm.mov, d);
            })
                .catch(function (error) {
                console.error("Error Adding mov: ", error);
            });
        }
        else {
            this.fs.updateMovement(this.mov);
            vm.showDetWin(vm.mov, d);
        }
    };
    DetailList.prototype.showDetWin = function (m, d) {
        var _this = this;
        var pout = { mov: m, det: d };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__detForm__["a" /* DetForm */], { 'pin': pout });
        modal.onDidDismiss(function (data) {
            _this.details$ = _this.fs.getDetailsByMov(_this.mov);
        });
        modal.present();
    };
    DetailList.prototype.dismiss = function () {
        var data = { 'data': 'comming from detailList' };
        this.viewCtrl.dismiss(data);
    };
    return DetailList;
}());
DetailList = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/share/detailList.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{title}} Total: \n      {{mov.amount | currency:\'USD\':true:\'1.0-0\'}}\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="close-circle" class="closeIcon" showWhen="android,windows,mobileweb,core"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid no-padding>\n    <ion-row class="movInfo">\n      <ion-col col-7>\n        <div *ngIf="(mov.fullName != undefined)" style="padding:10px">{{mov.fullName}}</div>\n        <ion-searchbar *ngIf="(mov.fullName == undefined)"\n          (ionInput)="getItems($event)" \n          placeholder="Ingrese cliente" \n          [(ngModel)]="mov.fullName">\n        </ion-searchbar>  \n        <ion-list *ngIf="showList">\n          <ion-item *ngFor="let cli of clientsTmp | async" (click)="setClient(cli)">\n            {{ cli.fullName }}\n          </ion-item>\n        </ion-list>  \n      </ion-col>\n      <ion-col col-5>\n        <div style="float:left;padding-top:10px" >Pago:</div>\n        <ion-select [disabled]="(mov.fullName != undefined)"\n          [(ngModel)]="mov.cp" \n          style="margin-top: 10px !important"\n          interface="popover" class="selectCP">\n          <ion-option value="EF">Efvo</ion-option>\n          <ion-option value="TG">Tarjeta</ion-option>\n          <ion-option value="CC">Cta.Cte.</ion-option>\n          <ion-option value="PC">Pago Cta.</ion-option>\n        </ion-select>        \n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <div *ngIf="showDetails">\n    <ion-grid class="gridInfo">\n      <ion-row class class="rowHeader">\n        <ion-col col-4>Descripcion</ion-col>\n        <ion-col col-2 style="text-align:right">#</ion-col>\n        <ion-col col-3 style="text-align:right">$ Unit.</ion-col>\n        <ion-col col-3 style="text-align:right">SubTot.</ion-col>\n      </ion-row> \n      <ion-row *ngFor="let det of details$ | async" \n        (click)="openDetail($evnet, det)"\n        class="rowDetail">\n        <ion-col col-4>{{det.product}}</ion-col>\n        <ion-col col-2 style="text-align:right" min="1">{{det.quantity}}</ion-col>\n        <ion-col col-3 style="text-align:right" min="0">{{det.price | currency:\'USD\':true:\'1.0-0\'}}</ion-col>\n        <ion-col col-3 style="text-align:right" min="0">{{det.subtotal | currency:\'USD\':true:\'1.0-0\'}}</ion-col>\n      </ion-row>\n    </ion-grid>  \n    \n    <ion-fab left bottom>\n      <button ion-fab style="background:red" mini (click)="deleteMovement(mov)">\n        <ion-icon name="trash" ></ion-icon>\n      </button>\n    </ion-fab>\n    <ion-fab right bottom>\n      <button ion-fab color="secondary" mini (click)="openDetail()">\n        <span style="font-size:30px">+</span>\n      </button>\n    </ion-fab>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/share/detailList.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__["a" /* FirebaseService */]])
], DetailList);

//# sourceMappingURL=detailList.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 215;

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseService = (function () {
    function FirebaseService(afs) {
        this.afs = afs;
    }
    //////////////////////
    // CLIENTs Interface
    //////////////////////
    FirebaseService.prototype.getClients = function (sortName, sortDir) {
        this.clientsRef = this.afs.collection('clients', function (ref) { return ref.orderBy(sortName, sortDir); });
        this.clients$ = this.clientsRef.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (action) {
                var d = action.payload.doc;
                var item = d.data();
                item.id = d.id;
                item.fullName = item.lastName + ', ' + item.firstName;
                return item;
            });
        });
        return this.clients$;
    };
    FirebaseService.prototype.getClientsAccounts = function (sortName, sortDir) {
        this.clientsRef = this.afs.collection('clients', function (ref) { return ref.where('balance', '<', 0).orderBy('balance').orderBy(sortName, sortDir); });
        this.clients$ = this.clientsRef.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (action) {
                var d = action.payload.doc;
                var item = d.data();
                item.id = d.id;
                return item;
            });
        });
        return this.clients$;
    };
    FirebaseService.prototype.getSalesByDate = function (day, sortName, sortDir) {
        var _this = this;
        // extraer hora de day y filtrar
        this.movementsRef = this.afs.collection('/movements', function (ref) { return ref.orderBy(sortName, sortDir); });
        // ref => ref.where('datetime', '>', day).orderBy(sortName, sortDir));
        this.sales$ = this.movementsRef.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (action) {
                var d = action.payload.doc;
                var mov = d.data();
                mov.id = d.id;
                _this.movCliRef = _this.afs.doc('/clients/' + mov.idClient);
                _this.movCli = _this.movCliRef.valueChanges();
                _this.movCli.subscribe(function (x) {
                    mov.fullName = x.lastName + ', ' + x.firstName;
                });
                return mov;
            });
        });
        return this.sales$;
    };
    FirebaseService.prototype.addClient = function (o) {
        this.clientsRef.add(__assign({}, o))
            .then(function (docRef) {
            console.log("New Client ID: ", docRef.id);
        })
            .catch(function (error) {
            console.error("Error Adding Client: ", error);
        });
    };
    FirebaseService.prototype.updateClient = function (o) {
        var u = this.clientsRef.doc(o.id);
        u.update(o)
            .then(function () {
            console.log("Update client ok");
        })
            .catch(function (error) {
            console.error("Error Updating client: ", error);
        });
    };
    FirebaseService.prototype.deleteClient = function (o) {
        this.clientsRef.doc(o.id).delete()
            .then(function () {
            console.log("Delete client ok");
        })
            .catch(function (error) {
            console.error("Error Deleting client: ", error);
        });
    };
    // /////////////////////
    // // Movement Interface
    // /////////////////////
    FirebaseService.prototype.getMovsByCli = function (cliId, sortName, sortDir) {
        // afs.collection('items', ref => {
        //     let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        //     if (size) { query = query.where('size', '==', size) };
        //     if (color) { query = query.where('color', '==', color) };
        //     return query;
        //   }).valueChanges()
        this.movementsRef = this.afs.collection('movements', function (ref) { return ref.where('idClient', '==', cliId).orderBy(sortName, sortDir); });
        this.movements$ = this.movementsRef.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (action) {
                var d = action.payload.doc;
                var item = d.data();
                item.id = d.id;
                return item;
            });
        });
        return this.movements$;
    };
    FirebaseService.prototype.addMovement = function (o) {
        return this.movementsRef.add(__assign({}, o));
    };
    FirebaseService.prototype.updateMovement = function (o) {
        var u = this.afs.doc('movements/' + o.id);
        u.update(Object.assign({}, o))
            .then(function () {
            console.log("Update mov ok");
        })
            .catch(function (error) {
            console.error("Error Updating mov: ", error);
        });
    };
    FirebaseService.prototype.deleteMovement = function (o) {
        this.movementsRef.doc(o.id).delete()
            .then(function () {
            console.log("Delete mov ok");
        })
            .catch(function (error) {
            console.error("Error Deleting mov: ", error);
        });
    };
    // /////////////////////////////////////////////
    // //////////////////////
    // // DETAILs Interface
    // //////////////////////
    FirebaseService.prototype.getDetailsByMov = function (mov) {
        this.detailsRef = this.afs.collection('movements/' + mov.id + '/details');
        this.details$ = this.detailsRef.snapshotChanges()
            .map(function (actions) {
            return actions.map(function (action) {
                var d = action.payload.doc;
                var item = d.data();
                item.id = d.id;
                return item;
            });
        });
        return this.details$;
    };
    FirebaseService.prototype.addDetail = function (m, d) {
        this.detailsRef = this.afs.collection('movements/' + m.id + '/details');
        this.detailsRef.add(__assign({}, d))
            .then(function (docRef) {
            console.log("New Det. ID: ", docRef.id);
        })
            .catch(function (error) {
            console.error("Error Adding det: ", error);
        });
    };
    FirebaseService.prototype.updateDetail = function (m, d) {
        this.detailsRef = this.afs.collection('movements/' + m.id + '/details');
        var u = this.detailsRef.doc(d.id);
        u.update(d)
            .then(function () {
            console.log("Update det ok");
        })
            .catch(function (error) {
            console.error("Error Updating det: ", error);
        });
    };
    FirebaseService.prototype.deleteDetail = function (o) {
        this.detailsRef.doc(o.id).delete()
            .then(function () {
            console.log("Delete det ok");
        })
            .catch(function (error) {
            console.error("Error Deleting det: ", error);
        });
    };
    // /////////////////////////////////////////////////
    // //////////////////////
    // // Reports Interface
    // //////////////////////
    FirebaseService.prototype.getSalesByMonth = function () {
        //  const arr = [
        //    {month:1,total:25000},
        //    {month:2,total:36000},
        //    {month:3,total:35000},
        //    {month:4,total:45000},
        //    {month:5,total:35000},
        //    {month:6,total:25000},
        //    {month:7,total:20000},
        //    {month:8,total:25000},
        //  ];
        var arr = [];
        var today = new Date();
        for (var i = 1; i < 20; i++) {
            var d = this.addDays(today, i);
            var t = d.getTime();
            var v = Math.floor(Math.random() * 50000) + 5000;
            var o = { datetime: t, total: v };
            arr.push(o);
        }
        return arr;
    };
    FirebaseService.prototype.handleError = function (error) {
        console.log('Error: ', error);
    };
    FirebaseService.prototype.addDays = function (d, days) {
        var dat = d; //new Date(d);
        dat.setDate(dat.getDate() + days);
        return dat;
    };
    return FirebaseService;
}());
FirebaseService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
], FirebaseService);

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogoPage = (function () {
    function LogoPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return LogoPage;
}());
LogoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-logo',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/logo/logo.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bienvenido</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background:white;text-align:center">\n  <img src="/assets/images/abracadabra.jpg" style="width:50%" >\n</ion-content>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/logo/logo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], LogoPage);

//# sourceMappingURL=logo.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cliForm__ = __webpack_require__(395);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ClientesPage = (function () {
    function ClientesPage(navCtrl, modalCtrl, alertCtrl, fs) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.fs = fs;
    }
    ClientesPage.prototype.ngOnInit = function () {
        this.clients$ = this.fs.getClients('lastName', 'asc');
    };
    ClientesPage.prototype.openClient = function ($event, cli) {
        var pout = cli;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cliForm__["a" /* CliForm */], { 'pin': pout });
        modal.present();
    };
    ClientesPage.prototype.mailClient = function ($event, cli) {
        window.location.href = "mailto:" + cli.email;
    };
    ClientesPage.prototype.callClient = function ($event, cli) {
        window.location.href = "tel://" + cli.telephone;
    };
    ClientesPage.prototype.deleteClient = function ($event, cli) {
        var _this = this;
        console.log(cli);
        var confirm = this.alertCtrl.create({
            title: 'Atencion',
            message: 'Esta seguro de eliminar este cliente?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Cancelacion de eliminacion');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.fs.deleteClient(cli);
                        console.log('Cliente eliminado');
                    }
                }
            ]
        });
        confirm.present();
    };
    return ClientesPage;
}());
ClientesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-clientes',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/clientes/clientes.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Clientes</ion-title>\n    <img src="/assets/images/logo.jpg" class="logo" >\n  </ion-navbar>\n    \n  <ion-item>        \n    <ion-label> <ion-icon name="search"></ion-icon></ion-label>\n    <ion-input clearInput type="text" [(ngModel)]="criteria" clearInput placeholder="Buscar cliente"  required></ion-input>\n  </ion-item>\n</ion-header>\n\n<ion-content padding class="bkg">\n  <ion-list>\n    <ion-item-sliding style="padding-right: 4px;" \n      *ngFor="let cli of clients$ | async | filterAgenda:criteria"  >\n      <ion-item\n        class="clientCard" [style.background]="(cli.balance >= 0) ? \n        \'linear-gradient(to bottom, #ded 0%, #ded 88%, #cdc 100%)\':\n        \'linear-gradient(to bottom, #edd 0%, #edd 88%, #dcc 100%)\'" >\n        <ion-grid no-padding>\n          <ion-row style="font-size:14px" no-padding>\n            <ion-col col-12 col-sm-6 col-lg-4>\n              <ion-icon name="cart" item-left></ion-icon> <strong>{{cli.balance | currency:\'USD\':true:\'1.0-0\' }}</strong>\n            </ion-col>\n            <ion-col col-12 col-sm-6 col-lg-4>\n              <ion-icon name="person" item-left></ion-icon>{{cli.lastName}} {{cli.firstName}} \n            </ion-col>\n            <ion-col col-12 col-sm-6 col-lg-4>\n              <ion-icon name="pin" item-left></ion-icon>{{cli.address}} \n            </ion-col>\n            <ion-col col-12 col-sm-6 col-lg-4>\n              <ion-icon name="mail" item-left></ion-icon>{{cli.email}}\n            </ion-col>\n            <ion-col col-12 col-sm-6 col-lg-4>\n              <ion-icon name="call" item-left></ion-icon>{{cli.telephone}}\n            </ion-col>\n            <ion-col col-12 col-sm-6 col-lg-4>\n              <ion-icon name="calendar" item-left></ion-icon>{{cli.birthday}}\n            </ion-col>            \n          </ion-row>\n        </ion-grid>\n        \n        <!--<div>-->\n        <!--  <ion-icon name="cart" item-left></ion-icon>-->\n        <!--  {{cli.balance | currency:\'USD\':true:\'1.0-0\' }}-->\n        <!--  <div style="float:right">-->\n        <!--    <ion-icon name="calendar" item-left></ion-icon>-->\n        <!--    {{cli.lastDatePaid | date:\'dd-MM-yyyy  HH:mm\' }}-->\n        <!--  </div>-->\n        <!--</div>-->\n        <!--<div>-->\n        <!--  <ion-icon name="person" item-left></ion-icon>-->\n        <!--  {{cli.lastName}}-->\n        <!--  {{cli.firstName}}            -->\n        <!--</div>-->\n        <!--<div>-->\n        <!--  <ion-icon name="locate" item-left></ion-icon>-->\n        <!--  {{cli.address}}            -->\n        <!--</div>-->\n        <!--<div>-->\n        <!--  <ion-icon name="mail" item-left></ion-icon>-->\n        <!--  {{cli.email}}-->\n        <!--</div>-->\n        <!--<div>-->\n        <!--  <ion-icon name="call" item-left></ion-icon>-->\n        <!--  {{cli.telephone}}-->\n        <!--</div>-->\n      </ion-item>\n      \n      <ion-item-options side="left">\n        <button ion-button class="cardOps" style="background:linear-gradient(#ffa,orange)" (click)="mailClient($event, cli)">\n          <ion-icon name="text"></ion-icon>\n          Mail\n        </button>\n        <button ion-button class="cardOps" style="background:linear-gradient(#bbf,#339)"  (click)="callClient($event, cli)">\n          <ion-icon name="call"></ion-icon>\n          Llamar\n        </button>\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button class="cardOps" style="background:linear-gradient(#bfb,#393)" (click)="openClient($event, cli)">\n          <ion-icon name="create"></ion-icon>\n          Editar\n        </button>\n        <button ion-button class="cardOps" style="background:linear-gradient(#fbb,#d22)" (click)="deleteClient($event, cli)">\n          <ion-icon name="trash"></ion-icon>\n          Borrar\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  \n  <ion-fab right bottom>\n    <button ion-fab color="primary" mini (click)="openClient()">\n      <span style="font-size:30px">+</span>\n    </button>\n  </ion-fab>\n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/clientes/clientes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1__services_firebase_service__["a" /* FirebaseService */]])
], ClientesPage);

//# sourceMappingURL=clientes.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CliForm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__share_entities_client__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CliForm = (function () {
    function CliForm(platform, params, viewCtrl, fs) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.fs = fs;
        this.title = "";
        this.action = "";
        this.client = new __WEBPACK_IMPORTED_MODULE_2__share_entities_client__["a" /* Client */]();
        this.pin = this.params.get('pin');
        if (this.pin) {
            this.client = this.pin;
            this.title = "Modificar cliente";
            this.action = "Grabar cambios";
        }
        else {
            this.title = "Nuevo cliente";
            this.action = "Agregar cliente";
        }
    }
    CliForm.prototype.save = function () {
        this.client.fullName = this.client.lastName + ', ' + this.client.firstName;
        if (this.pin) {
            this.fs.updateClient(this.client);
        }
        else {
            this.fs.addClient(this.client);
        }
        this.dismiss();
    };
    CliForm.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return CliForm;
}());
CliForm = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/clientes/cliForm.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{title}}\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="close-circle" class="closeIcon" showWhen="android,windows,mobileweb,core"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card\n    style="padding: 20px 5px;background:linear-gradient(#eef, lightblue)">\n      \n        <ion-item style="background:transparent">\n          <ion-icon name="person" item-left></ion-icon>\n          <ion-input type="text" [(ngModel)]="client.firstName" clearInput placeholder="Ingrese nombre"></ion-input>\n        </ion-item>\n      \n        <ion-item style="background:transparent">\n          <ion-icon name="person" item-left></ion-icon>\n          <ion-input type="text" [(ngModel)]="client.lastName" clearInput placeholder="Ingrese apellido"></ion-input>\n        </ion-item>\n        \n        <!--<ion-item style="background:transparent">-->\n        <!--  <ion-icon name="contacts" item-left></ion-icon>-->\n        <!--  <ion-label style="padding-left:7px">Sexo</ion-label>-->\n        <!--  <ion-select [(ngModel)]="client.sex">-->\n        <!--    <ion-option value="Mujer">Mujer</ion-option>-->\n        <!--    <ion-option value="Hombre">Hombre</ion-option>>-->\n        <!--  </ion-select>-->\n        <!--</ion-item>-->\n        \n        <ion-item style="background:transparent">\n          <ion-icon name="mail" item-left></ion-icon>\n          <ion-input type="text" [(ngModel)]="client.email" placeholder="Correo electronico"></ion-input>\n        </ion-item>\n        \n        <ion-item style="background:transparent">\n          <ion-icon name="pin" item-left></ion-icon>\n          <ion-input type="text" [(ngModel)]="client.address" placeholder="Domicilio"></ion-input>\n        </ion-item>\n        \n        <ion-item style="background:transparent">\n          <ion-icon name="call" item-left></ion-icon>\n          <ion-input type="text" [(ngModel)]="client.telephone" placeholder="Telefono o celular"></ion-input>\n        </ion-item>\n        \n        <ion-item style="background:transparent">\n            <ion-icon name="calendar " item-left></ion-icon>\n            <ion-datetime sytle="padding-left:6px !important;"\n                displayFormat="DD MMMM YYYY" [(ngModel)]="client.birthday"></ion-datetime>\n            <!--<ion-datetime -->\n            <!--    displayFormat="DD MMMM YYYY, HH:mm" -->\n            <!--    formControlName="measurementDate" -->\n            <!--    min="{{ diet.startDate | date:\'y-MM-dd\' }}"-->\n            <!--    max="{{ diet.endDate | date:\'y-MM-dd\' }}"></ion-datetime>-->\n        </ion-item>\n        \n        <button ion-button block (click)="save()" \n          style="width: 50%;position: absolute;margin-left: 20%;margin-top: 30px;">\n          {{action}}\n        </button>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/clientes/cliForm.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__services_firebase_service__["a" /* FirebaseService */]])
], CliForm);

//# sourceMappingURL=cliForm.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuentasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_config_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__share_movimientos__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CuentasPage = (function () {
    function CuentasPage(navCtrl, modalCtrl, alertCtrl, fs, cs) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.fs = fs;
        this.cs = cs;
        this.cfg = { maxDays: 0, maxMoney: 0 };
        this.sdName = 'desc';
        this.sdBal = 'desc';
        this.cs.config.subscribe(function (x) {
            _this.cfg = x;
            console.log('maxDays: ', x.maxDays);
        });
    }
    CuentasPage.prototype.ngOnInit = function () {
        this.clients$ = this.fs.getClientsAccounts('fullName', 'asc');
    };
    CuentasPage.prototype.sortByName = function () {
        this.sdName = this.toggleSortDir(this.sdName);
        this.clients$ = this.fs.getClientsAccounts('fullName', this.sdName);
    };
    CuentasPage.prototype.sortByBal = function () {
        this.sdBal = this.toggleSortDir(this.sdBal);
        this.clients$ = this.fs.getClientsAccounts('balance', this.sdBal);
    };
    CuentasPage.prototype.toggleSortDir = function (sd) {
        if (sd == 'desc')
            sd = 'asc';
        else
            sd = 'desc';
        return sd;
    };
    CuentasPage.prototype.evalTimeAlert = function (cli) {
        var op = .2;
        if (cli.balance < 0) {
            var today = new Date().getTime();
            var maxDays = this.cfg.maxDays;
            var difTime = Math.abs(today - cli.lastDatePaid);
            var difDays = Math.ceil(difTime / (1000 * 3600 * 24));
            if (difDays > maxDays)
                op = 1;
        }
        var st = {
            'opacity': op,
            'margin-top': '-5px',
            'width': '24px'
        };
        return st;
    };
    CuentasPage.prototype.evalMoneyAlert = function (cli) {
        var op = .2;
        if (cli.balance < 0) {
            var maxMoney = this.cfg.maxMoney;
            if (cli.balance < -maxMoney)
                op = 1;
        }
        var st = {
            'opacity': op,
            'margin-top': '-5px',
            'width': '24px'
        };
        return st;
    };
    CuentasPage.prototype.openMovements = function ($event, cli) {
        var _this = this;
        var pout = { 'cli': cli, 'type': 'CC' };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__share_movimientos__["a" /* Movimientos */], { 'pin': pout });
        modal.onDidDismiss(function (data) {
            _this.ngOnInit();
        });
        modal.present();
    };
    return CuentasPage;
}());
CuentasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-cuentas',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/cuentas/cuentas.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cuentas Corrientes</ion-title>\n    <img src="/assets/images/logo.jpg" class="logo" >\n  </ion-navbar>\n    \n  <ion-item>        \n    <ion-label> <ion-icon name="search"></ion-icon></ion-label>\n    <ion-input clearInput type="text" [(ngModel)]="criteria" clearInput placeholder="Buscar cliente"  required></ion-input>\n  </ion-item>\n\n</ion-header>\n\n<ion-content class="bkg" >\n  <ion-grid class="gridInfo" >\n    <ion-row class class="rowHeader">\n      <ion-col col-6 (click)="sortByName()">Nombre</ion-col>\n      <ion-col col-4 (click)="sortByBal()" style="text-align:right">Balance</ion-col>\n      <ion-col col-1 style="right:-3px"><ion-icon name="time"></ion-icon></ion-col>\n      <ion-col col-1 style="right:-3px"><ion-icon name="cart"></ion-icon></ion-col>\n    </ion-row> \n    <ion-row *ngFor="let cli of clients$ | async | filterAgenda:criteria" \n      class="rowInfo"\n      (click)="openMovements($event,cli)"\n      [style.background]="(cli.balance >=0) ? \n      \'linear-gradient(to bottom, #ded 0%, #ded 88%, #cdc 100%)\':\n      \'linear-gradient(to bottom, #edd 0%, #edd 88%, #dcc 100%)\'">\n      <ion-col col-6 >{{cli.fullName}}</ion-col>\n      <ion-col col-4 style="text-align:right">{{cli.balance | currency:\'USD\':true:\'1.0-0\'}}</ion-col>\n      <ion-col col-1><img src="/assets/images/redbutton.png" [ngStyle]="evalTimeAlert(cli)" ></ion-col>\n      <ion-col col-1><img src="/assets/images/bluebutton.png" [ngStyle]="evalMoneyAlert(cli)" ></ion-col>\n    </ion-row>\n  </ion-grid>  \n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/cuentas/cuentas.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */],
        __WEBPACK_IMPORTED_MODULE_3__services_config_service__["a" /* ConfigService */]])
], CuentasPage);

//# sourceMappingURL=cuentas.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetForm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_detail__ = __webpack_require__(590);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DetForm = (function () {
    function DetForm(platform, params, modalCtrl, alertCtrl, viewCtrl, fs) {
        // this.detalle = this.formBuilder.group({
        //   product: ['', Validators.required],
        //   quantity: ['', Validators.required],
        //   price: ['', Validators.required]
        // });
        this.platform = platform;
        this.params = params;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.fs = fs;
        // private detalle : FormGroup;
        this.title = "";
        this.flagNew = true;
        this.flagSaveOK = false;
        this.pin = { mov: {}, det: {} };
        this.pin = this.params.get('pin');
        if (this.pin.det) {
            this.flagNew = false;
            this.title = "Modificar detalle";
        }
        else {
            this.newDetail();
        }
    }
    DetForm.prototype.disableAdd = function () {
        // Habilita: Cuando se guardan los cambios del detalle actual.
        // Deshabilita: Cuando se presiona el boton.
        var res = (!this.flagSaveOK); // && (this.flagNew); 
        return res;
    };
    DetForm.prototype.disableSave = function () {
        // Habilita: Cuando detecta cambio en el detalle actual (nuevo o viejo)
        // Deshabilita: Cuando se guardan los cambios del detalle actual
        var res = (this.flagSaveOK) ||
            (this.pin.det.product == '') ||
            (this.pin.det.quantity == 0) ||
            (this.pin.det.price == '');
        return res;
    };
    DetForm.prototype.disableDelete = function () {
        // Habilita: Cuando se esta editando un detalle existente.
        // Deshabilita: Cuando se esta creando un detalle nuevo.
        var res = (this.flagNew);
        return res;
    };
    DetForm.prototype.calcSubTotal = function () {
        this.pin.det.subtotal = Number(this.pin.det.quantity) * Number(this.pin.det.price);
        return this.pin.det.subtotal;
    };
    DetForm.prototype.newDetail = function () {
        this.pin.det = new __WEBPACK_IMPORTED_MODULE_3__entities_detail__["a" /* Detail */]();
        this.pin.det.quantity = 0;
        this.pin.det.pricetag = 0;
        this.flagNew = true;
        this.flagSaveOK = false;
        this.title = "Nuevo detalle";
    };
    DetForm.prototype.save = function () {
        if (this.flagNew == true) {
            this.fs.addDetail(this.pin.mov, this.pin.det);
        }
        else {
            this.fs.updateDetail(this.pin.mov, this.pin.det);
        }
        this.flagSaveOK = true;
    };
    DetForm.prototype.deleteDetail = function ($event, key) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Atencion',
            message: 'Seguro elimina detalle?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Cancelacion de eliminacion');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.fs.deleteDetail(_this.pin.det);
                        console.log('Detalle eliminado');
                        _this.dismiss();
                    }
                }
            ]
        });
        confirm.present();
    };
    DetForm.prototype.dismiss = function () {
        var data = { 'data': 'comming from detForm' };
        this.viewCtrl.dismiss(data);
    };
    return DetForm;
}());
DetForm = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/share/detForm.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{title}}\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="close-circle" class="closeIcon" showWhen="android,windows,mobileweb,core"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!--[style.background]="(o.mov.cp == \'CC\') ? \'linear-gradient(to bottom, #edd 0%, #edd 88%, #dcc 100%)\':\'lightyellow\'"-->\n      \n    <ion-card\n      style="padding: 20px 5px">\n        \n      <ion-item style="background:transparent">\n        <ion-icon name="shirt" item-left></ion-icon>\n        <ion-input type="text" \n          [(ngModel)]="pin.det.product" \n          clearInput placeholder="Ingrese producto">\n        </ion-input>\n      </ion-item>\n    \n      <ion-item style="background:transparent">\n        <ion-icon name="grid" item-left></ion-icon>\n        <ion-input type="number" \n          [(ngModel)]="pin.det.quantity" \n          clearInput placeholder="Cantidad">\n        </ion-input>\n      </ion-item>\n      \n      <ion-item style="background:transparent">\n        <ion-icon name="pricetag" item-left></ion-icon>\n        $\n        <ion-input type="number" \n          [(ngModel)]="pin.det.price" \n          placeholder="Ingrece precio unitario">\n        </ion-input>\n      </ion-item>\n      \n      <ion-item style="background:transparent">\n        <ion-icon name="cart" item-left></ion-icon>\n        <label *ngIf="(pin.det.quantity > 0)&&(pin.det.price > 0)">{{calcSubTotal() | currency:\'USD\':true:\'1.0-0\'}}</label>\n      </ion-item>\n\n    </ion-card>\n         \n    <ion-grid>\n      <ion-row>\n        <ion-col col-8>\n          <button ion-fab [disabled]="disableDelete()" \n            style="background:red" mini \n            (click)="deleteDetail()">\n            <ion-icon name="trash" item-left></ion-icon>\n          </button>          \n        </ion-col>  \n        <ion-col col-2>\n          <button ion-fab [disabled]="disableSave()"\n            color="secondary" mini \n            (click)="save()">\n            <ion-icon name="checkmark-circle" item-left></ion-icon>\n          </button>\n        </ion-col>  \n        <ion-col col-2>\n          <button ion-fab [disabled]="disableAdd()" \n            color="primary" mini \n            (click)="newDetail()">\n            <span style="font-size:30px">+</span>\n          </button>\n        </ion-col>  \n      </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/share/detForm.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
], DetForm);

//# sourceMappingURL=detForm.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VentasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__share_detailList__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VentasPage = (function () {
    function VentasPage(navCtrl, modalCtrl, alertCtrl, fs) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.fs = fs;
        this.state = 'initState';
        this.today = new Date().getTime();
        this.totCC = 0;
        this.totEF = 0;
        this.totTG = 0;
        this.totPC = 0;
        this.totDay = 0;
        this.sdDate = 'desc';
        this.sdName = 'desc';
        this.sdCP = 'desc';
        this.sdAmt = 'desc';
    }
    VentasPage.prototype.ngOnInit = function () {
        this.sales$ = this.fs.getSalesByDate(this.today, 'fullName', 'asc');
        this.calcTotales();
    };
    VentasPage.prototype.ngAfterViewInit = function () {
        // this.toolsService.showTools(true);
        // this.toolsService.showDatePicker(true);
    };
    VentasPage.prototype.ngOnDestroy = function () {
        // this.toolsService.showTools(false);
        // this.toolsService.showDatePicker(false);
    };
    VentasPage.prototype.sortByDate = function () {
        this.sdDate = this.toggleSortDir(this.sdDate);
        this.sales$ = this.fs.getSalesByDate(this.today, 'datetime', this.sdDate);
    };
    VentasPage.prototype.sortByName = function () {
        this.sdName = this.toggleSortDir(this.sdName);
        this.sales$ = this.fs.getSalesByDate(this.today, 'fullName', this.sdName);
    };
    VentasPage.prototype.sortByCP = function () {
        this.sdCP = this.toggleSortDir(this.sdCP);
        this.sales$ = this.fs.getSalesByDate(this.today, 'cp', this.sdCP);
    };
    VentasPage.prototype.sortByAmount = function () {
        this.sdAmt = this.toggleSortDir(this.sdAmt);
        this.sales$ = this.fs.getSalesByDate(this.today, 'amount', this.sdAmt);
    };
    VentasPage.prototype.toggleSortDir = function (sd) {
        if (sd == 'desc')
            sd = 'asc';
        else
            sd = 'desc';
        return sd;
    };
    VentasPage.prototype.openDetails = function ($event, m) {
        var _this = this;
        var pout = {};
        if (m)
            pout = m;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__share_detailList__["a" /* DetailList */], { 'pin': pout });
        modal.onDidDismiss(function (data) {
            _this.ngOnInit();
        });
        modal.present();
    };
    VentasPage.prototype.deleteSale = function ($event, m) {
        var confirm = this.alertCtrl.create({
            title: 'Atencion',
            message: 'Esta seguro de eliminar esta venta?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Cancelacion de eliminacion');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        //this.fs.deleteMovement(m);
                        console.log('Venta eliminada');
                    }
                }
            ]
        });
        confirm.present();
    };
    VentasPage.prototype.calcTotales = function () {
        var _this = this;
        if (!this.sales$)
            return 0;
        this.totDay = 0;
        this.totCC = 0;
        this.totEF = 0;
        this.totTG = 0;
        this.totPC = 0;
        this.sales$.subscribe(function (ss) { return setTimeout(function () {
            ss.forEach(function (item) {
                if (item.cp == 'CC')
                    _this.totCC = _this.totCC + Number(item.amount);
                if (item.cp == 'TG')
                    _this.totTG = _this.totTG + Number(item.amount);
                if (item.cp == 'PC')
                    _this.totPC = _this.totPC + Number(item.amount);
                if (item.cp == 'EF')
                    _this.totEF = _this.totEF + Number(item.amount);
            });
            _this.totDay = _this.totEF + _this.totTG + _this.totPC; // + this.totCC; 
        }, 100); });
    };
    VentasPage.prototype.animationDone = function () {
        // En el HTML .... [@bounce]="state"
        // En el HTML .... (@bounce.done)="animationDone()"
        //this.state = 'rightSwipe'; // 'leftSwipe'
        this.state = 'initState';
    };
    return VentasPage;
}());
VentasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-ventas',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/ventas/ventas.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="float:left;padding-top: 8px;"><strong>Ventas del dia</strong></ion-title>\n    <ion-label style="float:right">{{today | date:\'dd-MM-yyyy\'}}</ion-label>\n  </ion-navbar>\n\n  <div style="text-align:center">\n      <ion-label><strong>Total: {{totDay | currency:\'USD\':true:\'1.0-0\'}}</strong></ion-label>\n      <ion-label><strong>Efvo:</strong>{{totEF | currency:\'USD\':true:\'1.0-0\'}} / <strong>Tar:</strong>{{totTG | currency:\'USD\':true:\'1.0-0\'}} / <strong>PC:</strong>{{totPC | currency:\'USD\':true:\'1.0-0\'}} / <strong>CC:</strong>{{totCC | currency:\'USD\':true:\'1.0-0\'}}</ion-label>\n  </div>  \n</ion-header>\n\n<ion-content>\n  <ion-grid class="gridInfo">\n    <ion-row class="rowHeader">\n      <ion-col col-2 (click)="sortByDate()">Hora</ion-col>\n      <ion-col col-6 (click)="sortByName()">Cliente</ion-col>\n      <ion-col col-1 (click)="sortByCP()">CP</ion-col>\n      <ion-col col-3 (click)="sortByAmount()" style="text-align:right">Monto</ion-col>\n    </ion-row>\n    <div *ngFor="let mov of sales$ | async">\n      <ion-row align-items-end *ngIf="(mov.cp != \'CC\')"\n        style="background:linear-gradient(to bottom, #eee 0%, #eee 88%, #ccc 100%)"\n        (click)="openDetails($event, mov)">\n        <ion-col col-2 >{{mov.datetime | date:\'HH:mm\'}}</ion-col>\n        <ion-col col-6 >{{mov.fullName}}</ion-col>\n        <ion-col col-1 >{{mov.cp}}</ion-col>\n        <ion-col col-3 style="text-align:right">{{mov.amount | currency:\'USD\':true}}</ion-col>\n      </ion-row>      \n    </div>\n  </ion-grid>\n\n  <ion-fab right bottom>\n    <button ion-fab primary mini (click)="openDetails({})">\n      <span style="font-size:30px">+</span>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/ventas/ventas.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('bounce', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["state"])('*', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
                    transform: 'translateX(0)'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => rightSwipe', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('700ms ease-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["keyframes"])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateX(0)', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateX(-65px)', offset: .3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateX(0)', offset: 1 })
                ]))),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])('* => leftSwipe', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('700ms ease-out', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["keyframes"])([
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateX(0)', offset: 0 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateX(65px)', offset: .3 }),
                    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateX(0)', offset: 1 })
                ]))),
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
], VentasPage);

//# sourceMappingURL=ventas.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResumenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__share_movimientos__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ResumenPage = (function () {
    function ResumenPage(navCtrl, modalCtrl, alertCtrl, fs) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.fs = fs;
        this.sdName = 'desc';
    }
    ResumenPage.prototype.ngOnInit = function () {
        this.clients$ = this.fs.getClients('fullName', 'asc');
    };
    ResumenPage.prototype.sortByName = function () {
        this.sdName = this.toggleSortDir(this.sdName);
        this.clients$ = this.fs.getClients('fullName', this.sdName);
    };
    ResumenPage.prototype.toggleSortDir = function (sd) {
        if (sd == 'desc')
            sd = 'asc';
        else
            sd = 'desc';
        return sd;
    };
    ResumenPage.prototype.openMovements = function ($event, cli) {
        var _this = this;
        var pout = { 'cli': cli, 'type': 'RC' };
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__share_movimientos__["a" /* Movimientos */], { 'pin': pout });
        modal.onDidDismiss(function (data) {
            _this.ngOnInit();
        });
        modal.present();
    };
    return ResumenPage;
}());
ResumenPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-resumen',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/resumen/resumen.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Resumenes de cuenta</ion-title>\n    <img src="/assets/images/logo.jpg" class="logo" >\n  </ion-navbar>\n    \n  <ion-item>        \n    <ion-label> <ion-icon name="search"></ion-icon></ion-label>\n    <ion-input clearInput type="text" [(ngModel)]="criteria" clearInput placeholder="Buscar cliente"  required></ion-input>\n  </ion-item>\n\n</ion-header>\n\n<ion-content class="bkg" >\n  <ion-grid class="gridInfo" >\n    <ion-row class class="rowHeader">\n      <ion-col col-6 (click)="sortByName()">Nombre</ion-col>\n    </ion-row> \n    <ion-row *ngFor="let cli of clients$ | async | filterAgenda:criteria" \n      class="rowInfo"\n      (click)="openMovements($event,cli)"\n      [style.background]="(cli.balance >=0) ? \n      \'linear-gradient(to bottom, #ded 0%, #ded 88%, #cdc 100%)\':\n      \'linear-gradient(to bottom, #edd 0%, #edd 88%, #dcc 100%)\'">\n      <ion-col col-6 >{{cli.fullName}}</ion-col>\n    </ion-row>\n  </ion-grid>  \n</ion-content>\n\n\n\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/resumen/resumen.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
], ResumenPage);

//# sourceMappingURL=resumen.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportesPage = (function () {
    function ReportesPage(navCtrl, navParams, modalCtrl, alertCtrl, platform, params, events, viewCtrl, fs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.params = params;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.fs = fs;
        this.salesByMonth = [];
        this.graphData = [];
        this.diet = {};
        var today = new Date();
        this.diet.duration = 10;
        this.diet.startDate = today;
        this.diet.endDate = __WEBPACK_IMPORTED_MODULE_3_moment__(today).add(15, 'days');
        ;
        this.diet.startWeight = 4000;
        this.diet.endWeight = 10000;
        this.salesByMonth = this.fs.getSalesByMonth();
        this.setGraphOptions();
        this.updateGraphData();
        this.getDietData();
        // the way to update the graph from different page 
        // (e.g. diet editor) is to publish the event (graph:update 
        // is just a custom event here). Here we subscribe to the event.
        // events.subscribe('graph:update', () => {
        //     // update graph
        //     this.updateGraphData();
        //     // update summary
        //     this.getDietData();
        // });
    }
    ReportesPage.prototype.setGraphOptions = function () {
        this.scatterOptions = {
            responsive: true,
            scales: {
                xAxes: [{
                        //  type: 'time',
                        //     time: {
                        //        displayFormats: {
                        //             quarter: 'MMM YYYY'
                        //        }
                        //     }
                        display: true,
                        ticks: {
                            callback: function (label, index, labels) {
                                return __WEBPACK_IMPORTED_MODULE_3_moment__(label).format('D/MM');
                            },
                            maxRotation: 0
                        }
                    }],
                yAxes: [{
                        display: true,
                        ticks: {
                            callback: function (label, index, labels) {
                                return label; //.toFixed(2);
                            },
                            max: 60000,
                            min: 5000 //Math.round(_.min([parseFloat(startWeight), parseFloat(endWeight)])) - 6
                        }
                    }]
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return __WEBPACK_IMPORTED_MODULE_3_moment__(tooltipItem.xLabel).format('D MM, HH:mm') + ': $' + parseFloat(tooltipItem.yLabel);
                    }
                },
                opacity: .8
            },
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                enabled: true,
                mode: 'x',
                limits: {
                    max: 10,
                    min: 0.5
                }
            },
        };
        this.barOptions = {
            responsive: true,
            scales: {
                xAxes: [{
                        //  type: 'time',
                        //     time: {
                        //        displayFormats: {
                        //             quarter: 'MMM YYYY'
                        //        }
                        //     }
                        display: true,
                        ticks: {
                            callback: function (label, index, labels) {
                                return __WEBPACK_IMPORTED_MODULE_3_moment__(label).format('D MMM');
                            },
                            maxRotation: 0
                        }
                    }],
                yAxes: [{
                        display: true,
                        ticks: {
                            callback: function (label, index, labels) {
                                return label; //.toFixed(2);
                            },
                            max: 60000,
                            min: 5000 //Math.round(_.min([parseFloat(startWeight), parseFloat(endWeight)])) - 6
                        }
                    }]
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return __WEBPACK_IMPORTED_MODULE_3_moment__(tooltipItem.xLabel).format('D MMM, HH:mm') + ': $' + parseFloat(tooltipItem.yLabel);
                    }
                },
                opacity: .8
            },
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                enabled: true,
                mode: 'x'
                //  limits: {
                //     max: 10,
                //     min: 0.5
                //  }
            },
        };
        this.lineOptions = {
            responsive: true,
            scales: {
                xAxes: [{
                        //  type: 'time',
                        //     time: {
                        //        displayFormats: {
                        //             quarter: 'MMM YYYY'
                        //        }
                        //     }
                        display: true,
                        ticks: {
                            callback: function (label, index, labels) {
                                return __WEBPACK_IMPORTED_MODULE_3_moment__(label).format('D');
                            }
                        }
                    }],
                yAxes: [{
                        display: true,
                        ticks: {
                            callback: function (label, index, labels) {
                                return label; //.toFixed(2);
                            },
                            max: 60000,
                            min: 5000
                        }
                    }]
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return __WEBPACK_IMPORTED_MODULE_3_moment__(tooltipItem.xLabel).format('D MMM, HH:mm') + ': $' + parseFloat(tooltipItem.yLabel);
                    }
                },
                opacity: .8
            },
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                enabled: true,
                mode: 'x',
                limits: {
                    max: 10,
                    min: 0.5
                }
            },
        };
    };
    ReportesPage.prototype.updateGraphData = function () {
        this.baseSerie = this.prepareBaseSerie();
        var dataSerie = {
            label: "Venta",
            data: this.salesByMonth.map(function (sale) {
                var dt = new Date(sale.datetime);
                return {
                    x: dt,
                    y: sale.total
                };
            }),
            fill: false,
            pointRadius: 2,
            borderColor: '#ff0000',
            pointBorderColor: '#6d6d6d',
            backgroundColor: '#67a3ed'
        };
        this.graphData = [this.baseSerie, dataSerie];
    };
    ReportesPage.prototype.getDietData = function () {
        // let currentDay, progress, now = new Date();
        // if (now >= moment(this.diet.endDate).toDate()) {
        //     currentDay = this.diet.duration;
        //     progress = 100;
        // } else if (now < moment(this.diet.startDate).toDate()) {
        //     currentDay = 0;
        //     progress = 0;
        // } else {
        //     currentDay = moment(now).diff(moment(this.diet.startDate), 'days');
        //     progress = ((currentDay / this.diet.duration) * 100.0).toFixed(2);
        // }
        // // let's find the latest measurement today
        // // measurements are ordered descending so first one from 
        // // today will be the latest today
        // let allowedToEat = null;
        // let latestWeight = null;
        // let allowedWeight = null;
        // let dietActive: boolean = false;
        // if (moment(this.diet.startDate).toDate() <= now && moment(this.diet.endDate).toDate() >= now) {
        //     dietActive = true;
        // }
        // if (dietActive) {
        //     let today: string = moment(new Date()).format('l');   // 6/9/2017
        //     this.diet.measurements.forEach(measurement => {
        //         if (latestWeight === null && moment(measurement.date).format('l') == today) {
        //             latestWeight = measurement.weight;
        //         }
        //     });
        //     this.graphData[0].data.forEach(data => {
        //         if (moment(data.x).format('l') == today) {
        //             allowedWeight = data.y;
        //         }
        //     });
        //     if (latestWeight && allowedWeight)
        //         allowedToEat = Math.round((allowedWeight - latestWeight) * 1000);
        // }
        // this.dietSummary = {
        //     currentDay,
        //     progress,
        //     allowedToEat,
        //     dietActive,
        //     allowedWeight
        // };
    };
    ReportesPage.prototype.ionViewDidLoad = function () {
        var col = {
            blueFill: 'rgba(54, 162, 235, 0.2)',
            blueBorder: 'rgba(54, 162, 235, 1)',
            yellowFill: 'rgba(255, 206, 86, 0.2)',
            yellowBorder: 'rgba(255, 206, 86, 0.2)',
            redFill: 'rgba(255, 99, 132, 0.2)',
            redBorder: 'rgba(255,99,132,1)',
            greenFill: 'rgba(75, 192, 192, 0.2)',
            greenBorder: 'rgba(75, 192, 192, 1)',
            purpleFill: 'rgba(153, 102, 255, 0.2)',
            purpleBorder: 'rgba(153, 102, 255, 1)',
            orangeFill: 'rgba(255, 159, 64, 0.2)',
            orangeBorder: 'rgba(255, 159, 64, 1)'
        };
        console.log(col.blueBorder);
        //     this.chartBarWeekCP = new Chart(this.barWeekCP.nativeElement, {
        //         type: 'bar',
        //         data: {
        //             labels: ["lun", "mar", "mie", "jue", "vie", "sab"],
        //             datasets: [{
        //                     label: 'Efectivo',
        //                     data: [7000, 5000, 3400, 5500, 6600, 9000],
        //                     backgroundColor: [
        //                         col.blueFill,
        //                         col.blueFill,
        //                         col.blueFill,
        //                         col.blueFill,
        //                         col.blueFill,
        //                         col.blueFill],
        //                     borderColor: [ 
        //                         col.blueBorder,
        //                         col.blueBorder,
        //                         col.blueBorder,
        //                         col.blueBorder,
        //                         col.blueBorder,
        //                         col.blueBorder],
        //                     borderWidth: 1
        //                 },
        //                 {
        //                     label: 'Tarjeta',
        //                     data: [4000, 4000, 3000, 5400, 5200, 6000],
        //                     backgroundColor: [
        //                         col.yellowFill,
        //                         col.yellowFill,
        //                         col.yellowFill,
        //                         col.yellowFill,
        //                         col.yellowFill,
        //                         col.yellowFill],
        //                     borderColor: [
        //                         col.yellowBorder,
        //                         col.yellowBorder,
        //                         col.yellowBorder,
        //                         col.yellowBorder,
        //                         col.yellowBorder,
        //                         col.yellowBorder],
        //                     borderWidth: 1
        //                 },
        //                 {
        //                     label: 'Cuenta',
        //                     data: [6000, 6000, 3000, 1500, 5600, 5000],
        //                     backgroundColor: [
        //                         col.redFill,
        //                         col.redFill,
        //                         col.redFill,
        //                         col.redFill,
        //                         col.redFill,
        //                         col.redFill],
        //                     borderColor: [
        //                         col.redBorder,
        //                         col.redBorder,
        //                         col.redBorder,
        //                         col.redBorder,
        //                         col.redBorder,
        //                         col.redBorder],
        //                     borderWidth: 1
        //                 },
        //                 {
        //                     label: 'Pago',
        //                     data: [2000, 1100, 1400, 1400, 1200, 700],
        //                     backgroundColor: [
        //                         col.greenFill,
        //                         col.greenFill,
        //                         col.greenFill,
        //                         col.greenFill,
        //                         col.greenFill,
        //                         col.greenFill],
        //                     borderColor: [
        //                         col.greenBorder,
        //                         col.greenBorder,
        //                         col.greenBorder,
        //                         col.greenBorder,
        //                         col.greenBorder,
        //                         col.greenBorder],
        //                     borderWidth: 1
        //                 },]
        //         },
        //         options: {
        //             scales: {
        //                 yAxes: [{
        //                     ticks: {
        //                         beginAtZero:true
        //                     }
        //                 }]
        //             }
        //         }
        //     });
        //     this.chartBarWeekTotal = new Chart(this.barWeekTotal.nativeElement, {
        //         type: 'bar',
        //         data: {
        //             labels: ["lun", "mar", "mie", "jue", "vie", "sab"],
        //             datasets: [{
        //                     label: 'Total diario',
        //                     data: [7000, 5000, 3400, 5500, 6600, 9000],
        //                     backgroundColor: [ 
        //                         col.purpleFill, 
        //                         col.purpleFill,
        //                         col.purpleFill,
        //                         col.purpleFill,
        //                         col.purpleFill,
        //                         col.purpleFill],
        //                     borderColor: [ 
        //                         col.purpleBorder,
        //                         col.purpleBorder,
        //                         col.purpleBorder,
        //                         col.purpleBorder,
        //                         col.purpleBorder,
        //                         col.purpleBorder],
        //                     borderWidth: 1
        //                 }]
        //         },
        //         options: {
        //             scales: {
        //                 yAxes: [{
        //                     ticks: {
        //                         beginAtZero:true
        //                     }
        //                 }]
        //             }
        //         }
        // });
        //     this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        //     type: 'doughnut',
        //     data: {
        //         labels: ["Efvo", "Tarjeta", "Cta.Cte.", "Pago a cta."],
        //         // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: 'Tipo Pago',
        //             data: [30, 40, 20, 10],
        //             backgroundColor: [
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)'
        //             ],
        //             hoverBackgroundColor: [
        //                 "#36A2EB",
        //                 "#FFCE56",
        //                 "#FF6384",
        //                 "#80CECE"
        //             ]
        //         }]
        //     }
        // });    
        //     this.chartLineMonthCP = new Chart(this.lineMonthCP.nativeElement, {
        //     type: 'line',
        //     data: {
        //         labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
        //         datasets: [
        //             {
        //                 label: "Efectivo",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: col.blueFill,
        //                 borderColor: col.blueBorder,
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: col.blueBorder,
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: col.blueFill,
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [2000, 2100, 1600, 4000, 1000, 3000, 1500],
        //                 spanGaps: false,
        //             },
        //             {
        //                 label: "Tarjeta",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: col.orangeFill,
        //                 borderColor: col.orangeBorder,
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: col.orangeBorder,
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: col.orangeFill,
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [3000, 5100, 3600, 4000, 1000, 3000, 2500],
        //                 spanGaps: false,
        //             },
        //             {
        //                 label: "Cta.Cte.",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: col.redFill,
        //                 borderColor: col.redBorder,
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: col.redBorder,
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: col.redFill,
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [1000, 1100, 600, 400, 9000, 700, 500],
        //                 spanGaps: false,
        //             },
        //             {
        //                 label: "Pago Cta.",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: col.greenFill,
        //                 borderColor: col.greenBorder,
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: col.greenBorder,
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: col.greenFill,
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [200, 200, 100, 400, 1000, 600, 500],
        //                 spanGaps: false,
        //             }
        //         ]
        //     }
        // });
        //     this.chartLineMonthTotal = new Chart(this.lineMonthTotal.nativeElement, {
        //     type: 'line',
        //     data: {
        //         labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
        //         datasets: [
        //             {
        //                 label: "Total mensual",
        //                 fill: false,
        //                 lineTension: 0.1,
        //                 backgroundColor: col.purpleFill,
        //                 borderColor: col.purpleBorder,
        //                 borderCapStyle: 'butt',
        //                 borderDash: [],
        //                 borderDashOffset: 0.0,
        //                 borderJoinStyle: 'miter',
        //                 pointBorderColor: col.purpleBorder,
        //                 pointBackgroundColor: "#fff",
        //                 pointBorderWidth: 1,
        //                 pointHoverRadius: 5,
        //                 pointHoverBackgroundColor: col.purpleFill,
        //                 pointHoverBorderColor: "rgba(220,220,220,1)",
        //                 pointHoverBorderWidth: 2,
        //                 pointRadius: 1,
        //                 pointHitRadius: 10,
        //                 data: [20000, 25000, 26000, 24000, 22000, 30000, 35000],
        //                 spanGaps: false,
        //             }
        //         ]
        //     }
        // });
    };
    ReportesPage.prototype.prepareBaseSerie = function () {
        var baseSerie = {
            label: "Base",
            data: [],
            fill: false,
            pointRadius: 0,
            borderColor: '#ff0000'
        };
        var currDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.diet.startDate).clone().startOf('day');
        var lastDate = __WEBPACK_IMPORTED_MODULE_3_moment__(this.diet.endDate).clone().startOf('day');
        var startWeight = this.diet.startWeight;
        var weightPerDay = (this.diet.endWeight - this.diet.startWeight) / this.diet.duration;
        do {
            baseSerie.data.push({
                x: currDate.clone().toDate(),
                y: startWeight
            });
            // startWeight += weightPerDay was treated as string
            startWeight -= (weightPerDay * (-1));
        } while (currDate.add(1, 'days').diff(lastDate) <= 0);
        return baseSerie;
    };
    return ReportesPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barWeekCP'),
    __metadata("design:type", Object)
], ReportesPage.prototype, "barWeekCP", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barWeekTotal'),
    __metadata("design:type", Object)
], ReportesPage.prototype, "barWeekTotal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
    __metadata("design:type", Object)
], ReportesPage.prototype, "doughnutCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('lineMonthCP'),
    __metadata("design:type", Object)
], ReportesPage.prototype, "lineMonthCP", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('lineMonthTotal'),
    __metadata("design:type", Object)
], ReportesPage.prototype, "lineMonthTotal", void 0);
ReportesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-reportes',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/reportes/reportes.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Reportes</ion-title>\n    <img src="/assets/images/logo.jpg" class="logo" >\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="false">\n    <ion-card>\n      <ion-card-header>\n        Ventas discriminadas x dia de semana\n      </ion-card-header>\n      <ion-card-content>\n        <!--<canvas #barWeekCP></canvas>-->\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-header>\n        Ventas totales x dia de semana\n      </ion-card-header>\n      <ion-card-content>\n        <!--<canvas #barWeekTotal></canvas>-->\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-header>\n        Distribucion por tipo de pago\n      </ion-card-header>\n      <ion-card-content>\n        <!--<canvas #doughnutCanvas></canvas>-->\n      </ion-card-content>\n    </ion-card>\n    <ion-card>\n      <ion-card-header>\n        Ventas discriminadas x mes\n      </ion-card-header>\n      <ion-card-content>\n        <!--<canvas #lineMonthCP></canvas>-->\n      </ion-card-content>\n    </ion-card>\n  </div>\n  \n    <ion-card>\n      <ion-card-header>\n        Ventas Totales x mes\n      </ion-card-header>\n      <ion-card-content>\n        <!--<div class="graph-container" >-->\n        <!--  <canvas baseChart width="400" height="400" -->\n        <!--  [datasets]="graphData" -->\n        <!--  [options]="graphOptions" -->\n        <!--  [legend]="false" -->\n        <!--  [chartType]="\'scatter\'">-->\n        <!--  </canvas>-->\n        <!--</div>-->\n       <canvas baseChart width="500" height="200" \n          [datasets]="graphData" \n          [options]="scatterOptions"\n          [legend]="false" \n          [chartType]="\'scatter\'"></canvas>           \n          <!--[labels]="barChartLabels"-->\n          <!--(chartHover)="chartHovered($event)"-->\n          <!--(chartClick)="chartClicked($event)"-->\n      </ion-card-content>\n    </ion-card>  \n    <ion-card>\n      <ion-card-header>\n        Ventas Totales Bar\n      </ion-card-header>\n      <ion-card-content>\n       <canvas baseChart width="500" height="200" \n          [datasets]="graphData" \n          [options]="barOptions"\n          [legend]="false" \n          [chartType]="\'scatter\'"></canvas>         \n      </ion-card-content>\n    </ion-card>  \n    <ion-card>\n      <ion-card-header>\n        Ventas Totales Line\n      </ion-card-header>\n      <ion-card-content>\n       <canvas baseChart width="500" height="200" \n          [datasets]="graphData" \n          [options]="lineOptions"\n          [legend]="false" \n          [chartType]="\'line\'"></canvas>         \n      </ion-card-content>\n    </ion-card>  \n</ion-content>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/reportes/reportes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__services_firebase_service__["a" /* FirebaseService */]])
], ReportesPage);

//# sourceMappingURL=reportes.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StockPage = (function () {
    function StockPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return StockPage;
}());
StockPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-stock',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/stock/stock.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Stock</ion-title>\n    <img src="/assets/images/logo.jpg" class="logo" >\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  \n</ion-content>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/stock/stock.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], StockPage);

//# sourceMappingURL=stock.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpcionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_config_service__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OpcionesPage = (function () {
    function OpcionesPage(navCtrl, cs) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.cs = cs;
        this.cfg = { maxDays: 7, maxMoney: 500 };
        this.cs.config.subscribe(function (o) {
            _this.cfg = o;
            console.log('maxDays: ', o.maxDays);
        });
    }
    OpcionesPage.prototype.save = function () {
        this.cs.updateConfig(this.cfg);
    };
    return OpcionesPage;
}());
OpcionesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-opciones',template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/pages/opciones/opciones.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Opciones</ion-title>\n    <img src="/assets/images/logo.jpg" class="logo" >\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card padding>\n    <h2 style="text-align:center">Cant.dias sin alertar: <strong>{{cfg.maxDays}}</strong></h2>\n    <ion-range min="0" step="7" max="90" pin="true" snaps="true" [(ngModel)]="cfg.maxDays">\n      <ion-label range-left class="small-text">0</ion-label> \n      <ion-label range-right>90</ion-label>\n    </ion-range> \n  </ion-card>\n  <ion-card padding>\n    <h2 style="text-align:center">Cant.de pesos sin alertar: <strong>{{cfg.maxMoney | currency:\'USD\':true:\'1.0-0\'}}</strong></h2>\n    <ion-range min="0" step="500" max="5000" pin="true" snaps="true" [(ngModel)]="cfg.maxMoney">\n      <ion-label range-left class="small-text">0</ion-label>\n      <ion-label range-right>$5000</ion-label>\n    </ion-range>\n  </ion-card>\n  <button ion-button block (click)="save()" \n    style="width: 50%;position: absolute;margin-left: 20%;margin-top: 30px;">\n    Guardar cambios\n  </button>\n</ion-content>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/pages/opciones/opciones.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_config_service__["a" /* ConfigService */]])
], OpcionesPage);

//# sourceMappingURL=opciones.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(416);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_pdf_make__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_charts__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_hammerjs__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_chartjs_plugin_zoom__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_chartjs_plugin_zoom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_chartjs_plugin_zoom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_filterAgenda_pipe__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_filterSales_pipe__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_logo_logo__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_clientes_clientes__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_cuentas_cuentas__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_resumen_resumen__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_ventas_ventas__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_reportes_reportes__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_stock_stock__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_opciones_opciones__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_clientes_cliForm__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__share_movimientos__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__share_detailList__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__share_detForm__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_firebase_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_config_service__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














//import { SocialSharing } from '@ionic-native/social-sharing';
//import { File } from '@ionic-native/file';















var firebaseConfig = {
    apiKey: "AIzaSyDVXm6zviniUGbxNYt4IkID7h1SLUFK0ZY",
    authDomain: "pypacc-6b17b.firebaseapp.com",
    databaseURL: "https://pypacc-6b17b.firebaseio.com",
    projectId: "pypacc-6b17b",
    storageBucket: "pypacc-6b17b.appspot.com",
    messagingSenderId: "412870176697"
    // apiKey: "AIzaSyCuni6oAx1Lz2DAf1v4JajsBaxcbn9O_EY",
    // authDomain: "pypaam.firebaseapp.com",
    // databaseURL: "https://pypaam.firebaseio.com",
    // projectId: "pypaam",
    // storageBucket: "pypaam.appspot.com",
    // messagingSenderId: "1013426715214"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__services_filterAgenda_pipe__["a" /* FilterAgenda */],
            __WEBPACK_IMPORTED_MODULE_13__services_filterSales_pipe__["a" /* FilterSales */],
            __WEBPACK_IMPORTED_MODULE_15__pages_logo_logo__["a" /* LogoPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_clientes_clientes__["a" /* ClientesPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_cuentas_cuentas__["a" /* CuentasPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_stock_stock__["a" /* StockPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_reportes_reportes__["a" /* ReportesPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_ventas_ventas__["a" /* VentasPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_resumen_resumen__["a" /* ResumenPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_opciones_opciones__["a" /* OpcionesPage */],
            __WEBPACK_IMPORTED_MODULE_25__share_detailList__["a" /* DetailList */],
            __WEBPACK_IMPORTED_MODULE_23__pages_clientes_cliForm__["a" /* CliForm */],
            __WEBPACK_IMPORTED_MODULE_26__share_detForm__["a" /* DetForm */],
            __WEBPACK_IMPORTED_MODULE_24__share_movimientos__["a" /* Movimientos */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_6_ng_pdf_make__["a" /* PdfmakeModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__["b" /* AngularFirestoreModule */].enablePersistence(),
            __WEBPACK_IMPORTED_MODULE_9_ng2_charts__["ChartsModule"]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_15__pages_logo_logo__["a" /* LogoPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_clientes_clientes__["a" /* ClientesPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_cuentas_cuentas__["a" /* CuentasPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_stock_stock__["a" /* StockPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_reportes_reportes__["a" /* ReportesPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_ventas_ventas__["a" /* VentasPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_resumen_resumen__["a" /* ResumenPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_opciones_opciones__["a" /* OpcionesPage */],
            __WEBPACK_IMPORTED_MODULE_25__share_detailList__["a" /* DetailList */],
            __WEBPACK_IMPORTED_MODULE_23__pages_clientes_cliForm__["a" /* CliForm */],
            __WEBPACK_IMPORTED_MODULE_26__share_detForm__["a" /* DetForm */],
            __WEBPACK_IMPORTED_MODULE_24__share_movimientos__["a" /* Movimientos */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_27__services_firebase_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_28__services_config_service__["a" /* ConfigService */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] }
            //SocialSharing,
            //File
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 277,
	"./af.js": 277,
	"./ar": 278,
	"./ar-dz": 279,
	"./ar-dz.js": 279,
	"./ar-kw": 280,
	"./ar-kw.js": 280,
	"./ar-ly": 281,
	"./ar-ly.js": 281,
	"./ar-ma": 282,
	"./ar-ma.js": 282,
	"./ar-sa": 283,
	"./ar-sa.js": 283,
	"./ar-tn": 284,
	"./ar-tn.js": 284,
	"./ar.js": 278,
	"./az": 285,
	"./az.js": 285,
	"./be": 286,
	"./be.js": 286,
	"./bg": 287,
	"./bg.js": 287,
	"./bn": 288,
	"./bn.js": 288,
	"./bo": 289,
	"./bo.js": 289,
	"./br": 290,
	"./br.js": 290,
	"./bs": 291,
	"./bs.js": 291,
	"./ca": 292,
	"./ca.js": 292,
	"./cs": 293,
	"./cs.js": 293,
	"./cv": 294,
	"./cv.js": 294,
	"./cy": 295,
	"./cy.js": 295,
	"./da": 296,
	"./da.js": 296,
	"./de": 297,
	"./de-at": 298,
	"./de-at.js": 298,
	"./de-ch": 299,
	"./de-ch.js": 299,
	"./de.js": 297,
	"./dv": 300,
	"./dv.js": 300,
	"./el": 301,
	"./el.js": 301,
	"./en-au": 302,
	"./en-au.js": 302,
	"./en-ca": 303,
	"./en-ca.js": 303,
	"./en-gb": 304,
	"./en-gb.js": 304,
	"./en-ie": 305,
	"./en-ie.js": 305,
	"./en-nz": 306,
	"./en-nz.js": 306,
	"./eo": 307,
	"./eo.js": 307,
	"./es": 308,
	"./es-do": 309,
	"./es-do.js": 309,
	"./es.js": 308,
	"./et": 310,
	"./et.js": 310,
	"./eu": 311,
	"./eu.js": 311,
	"./fa": 312,
	"./fa.js": 312,
	"./fi": 313,
	"./fi.js": 313,
	"./fo": 314,
	"./fo.js": 314,
	"./fr": 315,
	"./fr-ca": 316,
	"./fr-ca.js": 316,
	"./fr-ch": 317,
	"./fr-ch.js": 317,
	"./fr.js": 315,
	"./fy": 318,
	"./fy.js": 318,
	"./gd": 319,
	"./gd.js": 319,
	"./gl": 320,
	"./gl.js": 320,
	"./gom-latn": 321,
	"./gom-latn.js": 321,
	"./he": 322,
	"./he.js": 322,
	"./hi": 323,
	"./hi.js": 323,
	"./hr": 324,
	"./hr.js": 324,
	"./hu": 325,
	"./hu.js": 325,
	"./hy-am": 326,
	"./hy-am.js": 326,
	"./id": 327,
	"./id.js": 327,
	"./is": 328,
	"./is.js": 328,
	"./it": 329,
	"./it.js": 329,
	"./ja": 330,
	"./ja.js": 330,
	"./jv": 331,
	"./jv.js": 331,
	"./ka": 332,
	"./ka.js": 332,
	"./kk": 333,
	"./kk.js": 333,
	"./km": 334,
	"./km.js": 334,
	"./kn": 335,
	"./kn.js": 335,
	"./ko": 336,
	"./ko.js": 336,
	"./ky": 337,
	"./ky.js": 337,
	"./lb": 338,
	"./lb.js": 338,
	"./lo": 339,
	"./lo.js": 339,
	"./lt": 340,
	"./lt.js": 340,
	"./lv": 341,
	"./lv.js": 341,
	"./me": 342,
	"./me.js": 342,
	"./mi": 343,
	"./mi.js": 343,
	"./mk": 344,
	"./mk.js": 344,
	"./ml": 345,
	"./ml.js": 345,
	"./mr": 346,
	"./mr.js": 346,
	"./ms": 347,
	"./ms-my": 348,
	"./ms-my.js": 348,
	"./ms.js": 347,
	"./my": 349,
	"./my.js": 349,
	"./nb": 350,
	"./nb.js": 350,
	"./ne": 351,
	"./ne.js": 351,
	"./nl": 352,
	"./nl-be": 353,
	"./nl-be.js": 353,
	"./nl.js": 352,
	"./nn": 354,
	"./nn.js": 354,
	"./pa-in": 355,
	"./pa-in.js": 355,
	"./pl": 356,
	"./pl.js": 356,
	"./pt": 357,
	"./pt-br": 358,
	"./pt-br.js": 358,
	"./pt.js": 357,
	"./ro": 359,
	"./ro.js": 359,
	"./ru": 360,
	"./ru.js": 360,
	"./sd": 361,
	"./sd.js": 361,
	"./se": 362,
	"./se.js": 362,
	"./si": 363,
	"./si.js": 363,
	"./sk": 364,
	"./sk.js": 364,
	"./sl": 365,
	"./sl.js": 365,
	"./sq": 366,
	"./sq.js": 366,
	"./sr": 367,
	"./sr-cyrl": 368,
	"./sr-cyrl.js": 368,
	"./sr.js": 367,
	"./ss": 369,
	"./ss.js": 369,
	"./sv": 370,
	"./sv.js": 370,
	"./sw": 371,
	"./sw.js": 371,
	"./ta": 372,
	"./ta.js": 372,
	"./te": 373,
	"./te.js": 373,
	"./tet": 374,
	"./tet.js": 374,
	"./th": 375,
	"./th.js": 375,
	"./tl-ph": 376,
	"./tl-ph.js": 376,
	"./tlh": 377,
	"./tlh.js": 377,
	"./tr": 378,
	"./tr.js": 378,
	"./tzl": 379,
	"./tzl.js": 379,
	"./tzm": 380,
	"./tzm-latn": 381,
	"./tzm-latn.js": 381,
	"./tzm.js": 380,
	"./uk": 382,
	"./uk.js": 382,
	"./ur": 383,
	"./ur.js": 383,
	"./uz": 384,
	"./uz-latn": 385,
	"./uz-latn.js": 385,
	"./uz.js": 384,
	"./vi": 386,
	"./vi.js": 386,
	"./x-pseudo": 387,
	"./x-pseudo.js": 387,
	"./yo": 388,
	"./yo.js": 388,
	"./zh-cn": 389,
	"./zh-cn.js": 389,
	"./zh-hk": 390,
	"./zh-hk.js": 390,
	"./zh-tw": 391,
	"./zh-tw.js": 391
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 566;

/***/ }),

/***/ 585:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterAgenda; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterAgenda = (function () {
    function FilterAgenda() {
    }
    FilterAgenda.prototype.transform = function (items, criteria) {
        if (!criteria)
            return items;
        return items.filter(function (item) {
            var fn = item.firstName.toLowerCase().includes(criteria.toLowerCase());
            var ln = item.lastName.toLowerCase().includes(criteria.toLowerCase());
            return (fn || ln);
        });
    };
    return FilterAgenda;
}());
FilterAgenda = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'filterAgenda'
    })
], FilterAgenda);

//# sourceMappingURL=filterAgenda.pipe.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSales; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterSales = (function () {
    function FilterSales() {
    }
    FilterSales.prototype.transform = function (items, criteria) {
        if (!criteria)
            return items;
        return items.filter(function (item) {
            var a = item.amount.includes(criteria.toLowerCase());
            var t = item.idTicket.includes(criteria.toLowerCase());
            return (a || t);
        });
    };
    return FilterSales;
}());
FilterSales = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'filterSales'
    })
], FilterSales);

//# sourceMappingURL=filterSales.pipe.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_logo_logo__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_clientes_clientes__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_cuentas_cuentas__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_ventas_ventas__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_resumen_resumen__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_reportes_reportes__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_stock_stock__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_opciones_opciones__ = __webpack_require__(402);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import * as firebase from 'firebase/app';
//import { AuthService } from '../services/auth.service';








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.user = null;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_logo_logo__["a" /* LogoPage */]; //VentasPage;//LogoPage;
        this.home = { icon: 'home', title: 'Inicio', component: __WEBPACK_IMPORTED_MODULE_4__pages_logo_logo__["a" /* LogoPage */] };
        this.initializeApp();
        this.pages = [
            { icon: 'people', title: 'Clientes', component: __WEBPACK_IMPORTED_MODULE_5__pages_clientes_clientes__["a" /* ClientesPage */] },
            { icon: 'cart', title: 'Ventas diarias', component: __WEBPACK_IMPORTED_MODULE_7__pages_ventas_ventas__["a" /* VentasPage */] },
            { icon: 'person', title: 'Cuentas Corrientes', component: __WEBPACK_IMPORTED_MODULE_6__pages_cuentas_cuentas__["a" /* CuentasPage */] },
            { icon: 'pricetags', title: 'Resumenes de Cuenta', component: __WEBPACK_IMPORTED_MODULE_8__pages_resumen_resumen__["a" /* ResumenPage */] },
            { icon: 'stats', title: 'Reportes', component: __WEBPACK_IMPORTED_MODULE_9__pages_reportes_reportes__["a" /* ReportesPage */] },
            { icon: 'cut', title: 'Stock', component: __WEBPACK_IMPORTED_MODULE_10__pages_stock_stock__["a" /* StockPage */] },
            { icon: 'settings', title: 'Opciones', component: __WEBPACK_IMPORTED_MODULE_11__pages_opciones_opciones__["a" /* OpcionesPage */] }
        ];
    }
    MyApp.prototype.ngOnInit = function () {
        // this.auth.getAuthState().subscribe(
        //   (user) => this.user = user);
    };
    // loginWithGoogle(){
    //   this.auth.loginWithGoogle();
    // }
    MyApp.prototype.isLoggedIn = function () {
        var res = false; //const res = this.auth.isLoggedIn();
        return res;
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pablomassad/development/projects/-aam/code/src/app/app.html"*/'<!--<div *ngIf="user?.uid;else loginBox">-->\n<!--  <h2>TITULO PPAL.</h2>-->\n<!--</div>-->\n\n<div *ngIf="!isLoggedIn()"> \n  <ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title menuClose (click)="openPage(home)"><ion-icon [name]="home.icon" class="menuIcon"></ion-icon><span style="margin-left:10px; text-shadow: 1px 1.5px 1px #aaa;">{{home.title}}</span></ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <ion-list>\n        <button *ngFor="let p of pages" \n          menuClose ion-item\n          (click)="openPage(p)">\n          <ion-icon [name]="p.icon" class="menuIcon"></ion-icon><span style="margin-left:10px; text-shadow: 1px 1.5px 1px #aaa;">{{p.title}}</span> \n        </button>\n      </ion-list>\n    </ion-content>\n  </ion-menu>\n  \n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>  \n</div>\n\n<ng-template #loginBox> \n  <div stye="text-align:center;">\n    <h2>Administrador de cuentas de cliente</h2>\n  </div>\n  <button (click)="loginWithGoogle()">\n    Login con Google\n  </button>\n</ng-template>\n'/*ion-inline-end:"/Users/pablomassad/development/projects/-aam/code/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Client; });
var Client = (function () {
    function Client() {
        this.balance = 0;
        this.sales = 0;
        this.lastDatePaid = new Date().getTime();
        this.birthday = new Date().getTime();
    }
    return Client;
}());

//# sourceMappingURL=client.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Movement; });
var Movement = (function () {
    function Movement() {
        this.cp = "EF";
        this.datetime = new Date().getTime();
        this.type = 'D';
        this.amount = 0;
    }
    return Movement;
}());

//# sourceMappingURL=movement.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Detail; });
var Detail = (function () {
    function Detail() {
        this.product = '';
        this.subtotal = 0;
    }
    return Detail;
}());

//# sourceMappingURL=detail.js.map

/***/ })

},[403]);
//# sourceMappingURL=main.js.map