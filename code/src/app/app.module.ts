import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PdfmakeModule } from 'ng-pdf-make';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';
import 'chartjs-plugin-zoom';

import { FilterAgenda } from '../services/filterAgenda.pipe';
import { FilterSales } from '../services/filterSales.pipe';

//import { SocialSharing } from '@ionic-native/social-sharing';
//import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { LogoPage } from '../pages/logo/logo';
import { ClientesPage } from '../pages/clientes/clientes';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { ResumenPage } from '../pages/resumen/resumen';
import { VentasPage } from '../pages/ventas/ventas';
import { ReportesPage } from '../pages/reportes/reportes';
import { StockPage } from '../pages/stock/stock';
import { OpcionesPage } from '../pages/opciones/opciones';

import { CliForm } from '../pages/clientes/cliForm';
import { Movimientos } from '../share/movimientos';
import { DetailList } from '../share/detailList';
import { DetForm } from '../share/detForm';

import { FirebaseService } from '../services/firebase.service';
import { ConfigService } from '../services/config.service';

export const firebaseConfig ={
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

@NgModule({
  declarations: [
    MyApp,
    FilterAgenda,
    FilterSales,
    LogoPage,
    ClientesPage,
    CuentasPage,
    StockPage,
    ReportesPage,
    VentasPage,
    ResumenPage,
    OpcionesPage,
    DetailList,
    CliForm,
    DetForm,
    Movimientos
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PdfmakeModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LogoPage,
    ClientesPage,
    CuentasPage, 
    StockPage,
    ReportesPage,
    VentasPage,
    ResumenPage,
    OpcionesPage,
    DetailList,
    CliForm,
    DetForm,
    Movimientos
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    ConfigService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    //SocialSharing,
    //File
  ]
})
export class AppModule {}
