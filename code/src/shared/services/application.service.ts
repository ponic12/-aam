import { Injectable } from '@angular/core';
import { ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ApplicationService {
    private loader;
    imgPath:any= "../../assets/logo.png";
    
    constructor(
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private actionSheetCtrl: ActionSheetController
    ) {
        console.log('ApplicationService constructor');
    }

    newAlert(data:any):void{
        alert('Muestra alerta Toolbar');
    }

    showAlert(obj:any):void{
        let alert = this.alertCtrl.create(obj);
        alert.present();
    }
    /**
     * Function displays a message on the screen
     * 
     * @param  {string} type type of the message (succes / info / warning / error)
     * @param  {string} message text to display
     * @returns void
     */
    message(title: string, message: string, css?: string): void {
        var cl = 'toast-success';
        if (css) cl = css;
        // var msg = `<h4>{{title}}</h4><p>{{message}}</p>`;
        var msg = title + ": " + message;
        let toast = this.toastCtrl.create({
            message: msg,
            cssClass:cl,
            duration: 5000,
            position: 'bottom',
            dismissOnPageChange:false
        });
        toast.present();
    }

    showLoading(): Promise<any> {
        this.loader = this.loadingCtrl.create({
            //content: "cargando...",
            content: `
            <img src="assets/imgs/spinner.svg" />
            `,
            cssClass: 'my-loading-class',
            spinner: 'hide',
        });
        return this.loader.present();
    }

    hideLoading() : Promise<any> {
        return this.loader.dismiss();
    }

    showActionSheet(obj:any):void{
        let actionSheet = this.actionSheetCtrl.create(obj);
          actionSheet.present();
    }

}