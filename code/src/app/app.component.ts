import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import * as firebase from 'firebase/app';
//import { AuthService } from '../services/auth.service';

import { LogoPage } from '../pages/logo/logo';
import { ClientesPage } from '../pages/clientes/clientes';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { VentasPage } from '../pages/ventas/ventas';
import { ResumenPage } from '../pages/resumen/resumen';
import { ReportesPage } from '../pages/reportes/reportes';
import { StockPage } from '../pages/stock/stock';
import { OpcionesPage } from '../pages/opciones/opciones';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  user = null;
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LogoPage; //VentasPage;//LogoPage;
  home:any =  { icon:'home', title: 'Inicio', component: LogoPage };
  pages: Array<{icon:string, title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    
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
  
  ngOnInit(){
    // this.auth.getAuthState().subscribe(
    //   (user) => this.user = user);
  }
    
  // loginWithGoogle(){
  //   this.auth.loginWithGoogle();
  // }
  
  isLoggedIn(){
    var res = false; //const res = this.auth.isLoggedIn();
    return res;
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
