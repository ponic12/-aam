import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { FirebaseStorage } from 'firebase/storage'
import 'firebase/storage'

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
import { Movimientos } from '../common/movimientos';
import { DetailList } from '../common/detailList';
import { DetForm } from '../common/detForm';

import { FIREBASE_CONFIG } from '../common/services/firebase.config'
import { FirebaseService } from '../common/services/firebase.service';
import { ConfigService } from '../services/config.service';
import { ApplicationService } from '../shared/services/application.service';


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
      IonicStorageModule,
      BrowserModule,
      BrowserAnimationsModule,
      PdfmakeModule,
      IonicModule.forRoot(MyApp),
      AngularFireModule.initializeApp(FIREBASE_CONFIG),
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
      ApplicationService,
      ConfigService,
      { provide: ErrorHandler, useClass: IonicErrorHandler }
      //SocialSharing,
      //File
   ]
})
export class AppModule { }
