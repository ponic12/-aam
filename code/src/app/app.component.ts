import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LogoPage } from '../pages/logo/logo';
import { ClientesPage } from '../pages/clientes/clientes';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { VentasPage } from '../pages/ventas/ventas';
import { ResumenPage } from '../pages/resumen/resumen';
import { ReportesPage } from '../pages/reportes/reportes';
import { StockPage } from '../pages/stock/stock';
import { OpcionesPage } from '../pages/opciones/opciones';
import { FirebaseService } from '../common/services/firebase.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy {
  user = null;
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LogoPage; //VentasPage;//LogoPage;
  home:any =  { icon:'home', title: 'Inicio', component: LogoPage };
  pages: Array<{icon:string, title: string, component: any}>;

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private fs: FirebaseService,
    private splashScreen: SplashScreen) {
    console.log('MyApp constructor')
    this.initializeApp();
    this.pages = [
      { icon:'people', title: 'Clientes', component: ClientesPage },
      { icon:'cart', title: 'Ventas diarias', component: VentasPage },
      { icon:'person', title: 'Cuentas Corrientes', component: CuentasPage },
      { icon:'pricetags', title: 'Resumenes de Cuenta', component: ResumenPage },
      { icon:'stats', title: 'Reportes', component: ReportesPage },
      { icon:'cut', title: 'Stock', component: StockPage },
      { icon:'settings', title: 'Opciones', component: OpcionesPage } 
    ];
  }
  
  ngOnDestroy(){
     console.warn('MyApp destructor')
  }
  ngOnInit(){
     console.log('MyApp init')
  }

  isLoggedIn(){
    var res = false; //const res = this.auth.isLoggedIn();
    return res;
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  download(){
   this.fs.download('aam.apk')
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
